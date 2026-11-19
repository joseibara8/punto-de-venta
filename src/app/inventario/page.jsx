"use client";
import Nav_izquierdo from "@/components/Nav_izquierdo";
import React from "react";
import { useProductos } from "@/context/ProductosContext";
import estilos from "./inventario.module.css";
import Cargar_productos from "@/components/Cargar_productos";
import EditarProductoModal from "@/components/EditarProductoModal";

export default function Inventario() {
  const { productos, cargando, cargarProductos } = useProductos();
  const [productoEditar, setProductoEditar] = React.useState(null);
  if (cargando) return <p>Cargando productos...</p>;

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.contenedor_titulo}>
        <h2 className={estilos.titulo}>inventario</h2>
        <button className={estilos.boton_agregar} type="button">
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
        <div></div>
      </div>
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
