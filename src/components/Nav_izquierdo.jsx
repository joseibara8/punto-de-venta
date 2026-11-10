"use client";

import { useState } from "react";
import estilos from "./nav_izquierdo.module.css";

const opciones = [
  { nombre: "Ventas", icono: "shopping-cart" },
  { nombre: "Productos", icono: "box" },
  { nombre: "Inventario", icono: "boxes" },
  { nombre: "Clientes", icono: "users" },
  { nombre: "Reportes", icono: "chart-histogram" },
  { nombre: "Configuración", icono: "settings" },
];

function Nav_izquierdo() {
  const [activo, setActivo] = useState("Ventas");
  const [contraido, setContraido] = useState(false);

  return (
    <aside
      id="menu-principal"
      className={`${estilos.contenedor_navs} ${contraido ? estilos.contraido : ""}`}
    >
      <div className={estilos.cabecera}>
        <button
          type="button"
          className={estilos.alternar}
          aria-label={
            contraido ? "Expandir barra lateral" : "Contraer barra lateral"
          }
          aria-expanded={!contraido}
          aria-controls="menu-principal"
          title={contraido ? "Expandir menú" : "Contraer menú"}
          onClick={() => setContraido((valor) => !valor)}
        >
          <i
            className={`fi fi-rr-angle-${contraido ? "right" : "left"}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <nav className={estilos.navegacion} aria-label="Navegación principal">
        {opciones.map(({ nombre, icono }, indice) => (
          <button
            key={nombre}
            style={{ "--retraso-opcion": `${(indice + 1) * 0.2}s` }}
            type="button"
            className={`${estilos.boton} ${activo === nombre ? estilos.activo : ""}`}
            aria-pressed={activo === nombre}
            aria-label={nombre}
            title={contraido ? nombre : undefined}
            onClick={() => setActivo(nombre)}
          >
            <i className={`fi fi-rr-${icono}`} aria-hidden="true" />
            <span>{nombre}</span>
          </button>
        ))}
      </nav>

      <div className={estilos.pie}>
        <span className={estilos.avatar} aria-hidden="true">
          AD
        </span>
        <div>
          <p className={estilos.usuario}>Administración</p>
          <p className={estilos.subtitulo}>Punto de venta</p>
        </div>
      </div>
    </aside>
  );
}
export default Nav_izquierdo;
