import React from "react";
import estilos from "./cargar_productos.module.css";

export default function Cargar_productos({ productos, onEditar }) {
  return (
    <div className={estilos.contenedor}>
      <span className={estilos.dato}>
        <i className="fi fi-rr-cube" aria-hidden="true"></i>
        {productos.nombre}
      </span>
      <span className={estilos.dato}>
        <i className="fi fi-rr-category" aria-hidden="true"></i>
        {productos.categoria}
      </span>
      <span className={estilos.dato}>
        <i className="fi fi-rr-boxes" aria-hidden="true"></i>
        {Number.isFinite(Number(productos.cantidad))
          ? Number(productos.cantidad).toFixed(0)
          : "0"}
      </span>
      <span className={estilos.dato}>
        <i className="fi fi-rr-label" aria-hidden="true"></i>
        {productos.precio + "$"}
      </span>
      <span className={estilos.dato}>
        <i className="fi fi-rr-money" aria-hidden="true"></i>
        {productos.costo + "$"}
      </span>
      <button className={estilos.boton_editar} type="button" onClick={onEditar}>
        <i className="fi fi-rr-pencil" aria-hidden="true"></i>
        <span>Editar</span>
      </button>
    </div>
  );
}
