import estilos from "./venta_actual.module.css";

function Venta_actual({ carrito, cambiarCantidad, eliminarProducto }) {
  return (
    <div className={estilos.contenedor}>
      {carrito.length === 0 ? (
        <div className={estilos.estado_vacio} role="status">
          <span className={estilos.icono_vacio} aria-hidden="true">
            <i className="fi fi-sr-shopping-cart" />
          </span>
          <p>No hay productos en la venta.</p>
          <small>Agrega un producto para comenzar.</small>
        </div>
      ) : (
        <div className={estilos.contenedor_carrito}>
          {carrito.map((producto) => (
            <div className={estilos.carrito} key={producto.id}>
              <span className={estilos.nombre_producto}>{producto.nombre}</span>
              <div className={estilos.contenedor_botones}>
                <button
                  type="button"
                  aria-label={`Disminuir cantidad de ${producto.nombre}`}
                  onClick={() => cambiarCantidad(producto.id, -1)}
                >
                  <i className="fi fi-br-minus" aria-hidden="true"></i>
                </button>
                <span>{producto.unidades}</span>
                <button
                  type="button"
                  aria-label={`Aumentar cantidad de ${producto.nombre}`}
                  onClick={() => cambiarCantidad(producto.id, 1)}
                >
                  <i className="fi fi-br-plus" aria-hidden="true"></i>
                </button>
              </div>
              <span className={estilos.precio_producto}>
                {(producto.precio * producto.unidades).toFixed(2) +  "$"}
              </span>
              <button
                className={estilos.boton_eliminar}
                type="button"
                aria-label={`Eliminar ${producto.nombre}`}
                onClick={() => eliminarProducto(producto.id)}
              >
                <i className="fi fi-sr-trash" aria-hidden="true"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Venta_actual;
