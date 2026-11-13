import Venta_actual from "@/components/Venta_actual";
import estilos from "./cobrar.module.css";

function Cobrar({ carrito, cambiarCantidad, eliminarProducto }) {
  const total = carrito.reduce(
    (suma, producto) => suma + producto.precio * producto.unidades,
    0,
  );
  return (
    <div className={estilos.contenedor}>
      <div className={estilos.contenedor_cobro}>
        <div className={estilos.titulo_contenedor}>
          <h3>Venta actual</h3>
        </div>


        <Venta_actual
          carrito={carrito}
          cambiarCantidad={cambiarCantidad}
          eliminarProducto={eliminarProducto}
        />

        
        <div className={estilos.pagar_contenedor}>
          <div className={estilos.pagar}>
            <h5 className={estilos.etiqueta_total}>Total de la venta</h5>
            <h5 className={estilos.monto_total}>{total.toFixed(2)}$</h5>
          </div>
          <button className={estilos.boton_cobrar} type="button">
            Cobrar venta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cobrar;
