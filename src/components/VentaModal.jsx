import estilos from "./VentaModal.module.css";

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
  const obtener = (tipo) =>
    partes.find((parte) => parte.type === tipo)?.value ?? "";
  const mes = obtener("month").replace(".", "");

  return `${obtener("day")} ${mes} ${obtener("hour")}:${obtener("minute")}`;
}
export default function VentaModal({ venta, onCerrar }) {
  const productos = Array.isArray(venta.productos)
    ? venta.productos
    : typeof venta.productos === "string"
      ? JSON.parse(venta.productos)
      : [];

  return (
    <div className={estilos.fondo} onMouseDown={onCerrar}>
      <div
        className={estilos.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-venta"
        onMouseDown={(evento) => evento.stopPropagation()}
      >
        <button
          className={estilos.boton_cerrar}
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar detalle de venta"
        >
          <i className="fi fi-rr-cross" aria-hidden="true"></i>
        </button>
        <div className={estilos.contenedor_titulo}>

        <i className="fi fi-rr-receipt" aria-hidden="true"></i>
        <span id="titulo-venta">Venta #{venta.id}</span>
        </div>

        <div className={estilos.contenedor_subtitulo}>
          <span>{formatearFecha(venta.fecha_venta)}</span>
          <span >Cajero: {venta.cajero}</span>
        </div>

        <div className={estilos.marcadores}>
          <span>Productos</span>
          <span>Cantidad</span>
          <span>Precio</span>
          <span>Importe</span>
        </div>
        <ul className={estilos.productos}>
          {productos.map((producto, indice) => (
            <div
              key={producto.nombre + indice}
              className={estilos.contenedor_productos}
            >
              <span>{producto.nombre}</span>
              <span>{producto.unidades}</span>
              <span>{producto.precio + "$"}</span>
              <span>{producto.total_producto + "$"}</span>
            </div>
          ))}
        </ul>
        <div className={estilos.contenedor_total}>
          <span>Total</span>
          <span className={estilos.total}>${venta.total}</span>
        </div>
      </div>
    </div>
  );
}
