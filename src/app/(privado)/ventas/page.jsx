"use client";

import { useEffect, useState } from "react";
import estilos from "./page.module.css";
import Cargar_ventas from "@/components/Cargar_ventas";
import VentaModal from "@/components/VentaModal";
import { useVentas } from "@/context/VentasContext";

export default function Ventas() {
  const {caja, cargandoCaja, errorCaja, ventas, cargandoVentas, errorVentas} = useVentas()
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  const cajaActual = caja[0] ?? {};

  return (
    <div className={estilos.contenedor}>
      <div className={estilos.contenedor_titulo}>
        <h2 className={estilos.titulo}>ventas</h2>
        <span className={estilos.subtitulo}>Historial y Resumen de Ventas</span>
      </div>
      <div className={estilos.contenedor_subtitulos}>
        <div className={estilos.subtitulo}>
          <i className="fi fi-rr-receipt" aria-hidden="true"></i>
          <div className={estilos.contenido_subtitulo}>
            <span>Ventas de hoy</span>
            <span>{cargandoCaja ? "..." : (cajaActual.numero_venta ?? 0)}</span>
          </div>
        </div>
        <div className={estilos.subtitulo}>
          <i className="fi fi-rr-money" aria-hidden="true"></i>
          <div className={estilos.contenido_subtitulo}>
            <span>Ganancias hoy</span>
            <span>
              {cargandoCaja ? "..." : `${cajaActual.ganancias ?? 0}$`}
            </span>
          </div>
        </div>
        <div className={estilos.subtitulo}>
          <i className="fi fi-rr-chart-histogram" aria-hidden="true"></i>
          <div className={estilos.contenido_subtitulo}>
            <span>Total vendido</span>
            <span>{cargandoCaja ? "..." : `${cajaActual.total ?? 0}$`}</span>
          </div>
        </div>
      </div>
      <div className={estilos.contenedor_inputs}>
        <div className={estilos.contenedor_search}>
          <div className={estilos.barra_busqueda}>
            <i className="fi fi-rr-search" aria-hidden="true"></i>
            <input
              type="search"
              placeholder="Escribe el numero de venta del ticket que quieras buscar"
            />
          </div>
        </div>
      </div>
      <div className={estilos.contenedor_ventas}>
        <div className={estilos.contenedor_indicadores}>
          <span>#Folio</span>
          <span>Fecha y hora</span>
          <span>Cajero</span>
          <span>Productos</span>
          <span>Total</span>
          <span>Acciones</span>
        </div>
        <Cargar_ventas
          ventas={ventas}
          cargando={cargandoVentas}
          error={errorVentas}
          onVerDetalle={setVentaSeleccionada}
        />
      </div>
      {errorCaja && <p role="alert">{errorCaja}</p>}
      {ventaSeleccionada && (
        <VentaModal
          venta={ventaSeleccionada}
          onCerrar={() => setVentaSeleccionada(null)}
        />
      )}
    </div>
  );
}
