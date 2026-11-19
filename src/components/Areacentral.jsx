"use client";

import React, { useState } from "react";
import estilos from "./areacentral.module.css";
import Producto_card from "@/components/Producto_card";
import { useProductos } from "@/context/ProductosContext";

export default function AreaCentral({ agregarProducto }) {
  const [valorinput, setValorinput] = useState("");
  const { productos, cargando, error } = useProductos();

  const textobuscado = valorinput.trim().toLocaleLowerCase();

  const productosFiltrados = productos.filter((producto) => {
    return producto.nombre.toLowerCase().includes(textobuscado);
  });

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.contenedor_busquda}>
        <div className={estilos.barra_busqueda}>
          <i className="fi fi-rr-search"></i>
          <input
            type="search"
            placeholder="Escribe el nombre del producto que quieras buscar "
            onChange={(e) => setValorinput(e.target.value)}
          />
        </div>
      </div>

      <div className={estilos.contenedor_productos}>
        {cargando ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : productosFiltrados.length === 0 ? (
          <div className={estilos.sin_productos} role="status">
            <span className={estilos.icono_sin_productos} aria-hidden="true">
              <i className="fi fi-rr-search" />
            </span>
            <h3>{"No se encontraron productos llamados: " + textobuscado}</h3>
            <p>
              {textobuscado
                ? "Intenta buscar con otro producto."
                : "Todavía no hay productos disponibles."}
            </p>
          </div>
        ) : (
          productosFiltrados.slice(0, 6).map((producto) => (
            <Producto_card
              key={producto.id}
              producto={producto}
              agregarProducto={agregarProducto}
            />
          ))
        )}
      </div>
    </div>
  );
}
