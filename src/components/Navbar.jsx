"use client";

import { useState } from "react";
import estilos from "./navbar.module.css";

export default function Navbar() {
  const [tema, setTema] = useState("light");
  const [cajero, setCajero] = useState("ana");

  function cambiarTema() {
    const siguienteTema = tema === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = siguienteTema;
    setTema(siguienteTema);
  }

  const etiquetaTema =
    tema === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro";

  return (
    <header className={estilos.contenedor}>
      <nav className={estilos.navbar} aria-label="Barra superior">
        <div className={estilos.negocio}>
          <span className={estilos.iconoTienda} aria-hidden="true">
            <i className="fi fi-rr-shop" />
          </span>
          <span className={estilos.nombre}>Mi negocio</span>
        </div>

        <h1 className={estilos.seccion}>Punto de venta</h1>

        <div className={estilos.acciones}>
          <label className={estilos.selectorCajero}>
            <i className="fi fi-rr-user" aria-hidden="true" />
            <span>Cajero:</span>
            <select
              aria-label="Cambiar cajero"
              value={cajero}
              onChange={(event) => setCajero(event.target.value)}
            >
              <option value="ana">Ana López</option>
              <option value="carlos">Carlos García</option>
              <option value="maria">María Pérez</option>
            </select>
            <i
              className={`fi fi-rr-angle-small-down ${estilos.flechaCajero}`}
              aria-hidden="true"
            />
          </label>
          <div className={estilos.separadorTema}>
            <button
              type="button"
              className={estilos.botonTema}
              onClick={cambiarTema}
              aria-label={etiquetaTema}
              title={etiquetaTema}
            >
              <i
                className={`fi fi-rr-${tema === "light" ? "moon" : "sun"}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
