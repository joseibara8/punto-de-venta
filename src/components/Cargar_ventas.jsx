"use client";

import estilos from "./cargar_venta.module.css";

const formatoFecha = new Intl.DateTimeFormat("es-MX", {
  timeZone: "America/Mazatlan",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function formatearFecha(fecha) {
  if (!fecha) return "—";

  const partes = formatoFecha.formatToParts(new Date(fecha));
  const obtener = (tipo) => partes.find((parte) => parte.type === tipo)?.value ?? "";
  const mes = obtener("month").replace(".", "");

  return `${obtener("day")} ${mes} ${obtener("hour")}:${obtener("minute")}`;
}

export default function Cargar_ventas({ ventas = [], cargando, error, onVerDetalle }) {
  if (cargando) return <p>Cargando ventas...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (ventas.length === 0) return <p>Todavía no hay ventas.</p>;

  return ventas.map((venta) => (
    <div key={venta.id} className={estilos.contenedor}>
      <span>#{venta.id}</span>
      <span className={estilos.dato_venta}>
        <i className="fi fi-rr-calendar-clock" aria-hidden="true"></i>
        {formatearFecha(venta.fecha_venta)}
      </span>
      <span className={estilos.dato_venta}>
        <i className="fi fi-rr-user" aria-hidden="true"></i>
        {venta.cajero}
      </span>
      <span className={estilos.dato_venta}>
        <i className="fi fi-rr-boxes" aria-hidden="true"></i>
        {venta.cantidad_de_productos} productos
      </span>
      <span>${venta.total}</span>
      <span className={estilos.contenedor_accion}>
        <button
          className={estilos.boton_detalle}
          type="button"
          onClick={() => onVerDetalle(venta)}
        >
          <i className="fi fi-rr-eye" aria-hidden="true"></i>
          <span>Ver detalle</span>
        </button>
      </span>
    </div>
  ));
}
