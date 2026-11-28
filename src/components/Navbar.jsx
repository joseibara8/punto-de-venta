"use client";

import { useEffect, useState } from "react";
import estilos from "./navbar.module.css";
import { useSession } from "@/context/SessionContext";

export default function Navbar() {
  const [tema, setTema] = useState("light");
  const [cajeros, setCajeros] = useState([]);
  const { nombre: cajero_actual } = useSession();
  const [cargando,setcargando] = useState(false);
  const [error,setError] = useState("");
const [cajero, setCajero] = useState(cajero_actual);

  function cambiarTema() {
    const siguienteTema = tema === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = siguienteTema;
    setTema(siguienteTema);
  }

  async function cargarUsuarios() {
     setcargando(true);
     setError("");
 
     try {
       const respuesta = await fetch("/api/auth/usuario");
 
       
       const datos = await respuesta.json();
       console.log(datos);
       
 
       
       if (!respuesta.ok) {
         throw new Error(datos.error ?? "No se pudieron cargar los cajeros");
       }
 
       setCajeros(datos);
     } catch (error) {
       setError(error.message);
       
     } finally {
       setcargando(false);
     }
   }
 
   useEffect(() => {
     cargarUsuarios();
   }, []);
 
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
              value={cajero_actual}
              onChange={(event) => setCajero(event.target.value)}
            >
          {cajeros.map((cajero) => (
            <option key={cajero.id} value={cajero.nombre}>
              {cajero.nombre}
            </option>
          ))}
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
                className={`fi fi-sr-${tema === "light" ? "moon" : "sun"}`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
