"use client";
import React, { useState } from "react";
import estilos from "./crear_producto.module.css";

export default function Crear_producto({ guardar, onCerrar }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");
  const [costo, setCosto] = useState("");

  return (
    <div className={estilos.fondo}>
      <div className={estilos.modal}>
        <div className={estilos.contenedor}>
          <div className={estilos.contenedor_titulo}>
            <h2>Agrega un producto</h2>
          </div>
          <div className={estilos.contenedor_valores}>
            <div className={estilos.contenedor_inputs}>
              <span>nombre</span>
              <input
                type="text"
                placeholder="nombre del producto..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className={estilos.contenedor_inputs}>
              <span>categoria</span>
              <input
                placeholder="refrescos"
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </div>
            <div className={estilos.contenedor_inputs}>
              <span>cantidad</span>
              <input
                placeholder="22"
                type="text"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              />
            </div>
            <div className={estilos.contenedor_inputs}>
              <span>precio</span>
              <input
                placeholder="25.00"
                type="text"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>
            <div className={estilos.contenedor_inputs}>
              <span>costo</span>
              <input
                placeholder="20.00"
                type="text"
                value={costo}
                onChange={(e) => setCosto(e.target.value)}
              />
            </div>
          </div>
          <div className={estilos.acciones}>
            <button className={estilos.boton_cancelar} type="button" onClick={() =>{onCerrar}}>
              Cancelar
            </button>
            <button
              className={estilos.boton_guardar}
              type="button"
              onClick={() =>
                guardar({
                  nombre,
                  categoria,
                  cantidad: Number(Number(cantidad).toFixed(2)),
                  precio: Number(Number(precio).toFixed(2)),
                  costo: Number(Number(costo).toFixed(2)),
                })
              }
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
