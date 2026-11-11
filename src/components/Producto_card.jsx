import React from 'react'
import estilos from "./producto_card.module.css";
function Producto_card({producto}) {
  return (
    <div className={estilos.contenedor}>
        <h4>{producto.nombre}</h4>
        <span>{"Cantidad: " + producto.cantidad}</span>
        <span>{"precio: " + producto.precio + "$"}</span>
        <button type="button" className={estilos.boton_agregar}>
          <i className="fi fi-rr-plus" aria-hidden="true" />
          Agregar
        </button>
    </div>
  )
}

export default Producto_card
