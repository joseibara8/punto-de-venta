"use client";
import Nav_izquierdo from "@/components/Nav_izquierdo";
import React, { useState } from "react";
import { useProductos } from "@/context/ProductosContext";
import estilos from "./inventario.module.css";
import Cargar_productos from "@/components/Cargar_productos";
import EditarProductoModal from "@/components/EditarProductoModal";
import Crear_producto from "@/components/Crear_producto";

export default function Inventario() {
  const { productos, cargando, cargarProductos } = useProductos();
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoEditar, setProductoEditar] = React.useState(null);
  if (cargando) return <p>Cargando productos...</p>;

async function guardar(productoNuevo) {
  const res = await fetch("/api/productos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productoNuevo),
  });

  if (!res.ok) {
    console.log(productoNuevo);
    
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
          />
        </div>
      </div>
      <div className={estilos.contenedor_ventas}>
        <div className={estilos.contenedor_indicadores}>
          <span>producto</span>
          <span>categoria</span>
          <span>existencias</span>
          <span>precio</span>
          <span>costo</span>
          <span>acciones</span>
        </div>
        {productos.map((producto) => (
          <Cargar_productos
            key={producto.id}
            productos={producto}
            onEditar={() => setProductoEditar(producto)}
          />
        ))}
      </div>
      {modalAbierto && (
        <Crear_producto
          onCerrar={() => setModalAbierto(false)}
          onProductoAgregado={async () => {
            await cargarProductos();
            setModalAbierto(false);
          }}
        />
      )}
      {modalAbierto && (
        <Crear_producto
          guardar={guardar}
          onCerrar={() => setModalAbierto(false)}
        />
      )}
    </div>
  );
}
