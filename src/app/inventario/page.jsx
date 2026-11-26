"use client";
import React, { useState } from "react";
import { useProductos } from "@/context/ProductosContext";
import estilos from "./inventario.module.css";
import Cargar_productos from "@/components/Cargar_productos";
import EditarProductoModal from "@/components/EditarProductoModal";
import Crear_producto from "@/components/Crear_producto";


function normalizarTexto(texto) {
  return String(texto ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function Inventario() {
  const { productos, cargando, cargarProductos } = useProductos();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditar, setProductoEditar] = React.useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  if (cargando) return <p>Cargando productos...</p>;

  const textoBuscado = normalizarTexto(busqueda);

  const productosPorNombre = productos.filter((producto) =>
    normalizarTexto(producto.nombre).includes(textoBuscado),
  );

  const productosFiltrados = productosPorNombre.filter((producto) => {
    if (categoriaSeleccionada === "") {
      return true;
    }

    return producto.categoria === categoriaSeleccionada;
  });

  async function guardar(productoNuevo) {
    const res = await fetch("/api/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productoNuevo),
    });

    if (!res.ok) {

      console.error("No se pudo agregar el producto");
      return;
    }

    await cargarProductos();
    setModalAbierto(false);
  }
  return (
    <div className={estilos.contenedor}>
      <div className={estilos.contenedor_titulo}>
        <h2 className={estilos.titulo}>inventario</h2>
        <button
          className={estilos.boton_agregar}
          onClick={() => setModalAbierto(true)}
          type="button"
        >
          <i className="fi fi-rr-plus" aria-hidden="true"></i>
          <span>Agregar producto</span>
        </button>
      </div>
      <div className={estilos.contenedor_search}>
        <div className={estilos.barra_busqueda}>
          <i className="fi fi-rr-search"></i>
          <input
            type="search"
            placeholder="Escribe el nombre del producto que quieras buscar"
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />
        </div>
        <select
          className={estilos.select}
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.categoria}>
              {producto.categoria}
            </option>
          ))}
        </select>
      </div>
      <div className={estilos.contenedor_ventas}>
        <div className={estilos.contenedor_indicadores}>
          <span>Producto</span>
          <span>Categoria</span>
          <span>Existencias</span>
          <span>Precio</span>
          <span>Costo</span>
          <span>Acciones</span>
        </div>
        {productosFiltrados.map((producto) => (
          <Cargar_productos
            key={producto.id}
            productos={producto}
            onEditar={() => setProductoEditar(producto)}
          />
        ))}
      </div>
      {modalAbierto && (
        <Crear_producto
          guardar={guardar}
          onCerrar={() => setModalAbierto(false)}
        />
      )}

      {productoEditar && (
        <EditarProductoModal
          producto={productoEditar}
          onCerrar={() => setProductoEditar(null)}
          onGuardado={async () => {
            await cargarProductos();
            setProductoEditar(null);
          }}
        />
      )}
    </div>
  );
}
