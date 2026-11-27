"use client";
import Areacentral from "@/components/Areacentral";
import Cobrar from "@/components/Cobrar";
import estilos from "./page.module.css";
import { useState } from "react";
import { useProductos } from "@/context/ProductosContext";
import { useVentas } from "@/context/VentasContext";


export default function Home() {
  const { cargarProductos } = useProductos();
  const [carrito, setCarrito] = useState([]);
  const [error_cantidad, setError_cantidad] = useState("");
  const {actualizarDatos} = useVentas();



  


  function agregarProducto(producto, productoCantidad1) {
  const stock = Number(productoCantidad1);
  const itemActual = carrito.find((item) => item.id === producto.id);
  const unidadesActuales = itemActual ? Number(itemActual.unidades) : 0;

  if (!Number.isFinite(stock)) {
    setError_cantidad("*No se pudo comprobar el stock*");
    return;
  }

  if (unidadesActuales + 1 > stock) {
    setError_cantidad(`*Solo hay ${stock} unidades disponibles*`);
    return;
  }

  setError_cantidad("");

  setCarrito((carritoActual) => {
    const existe = carritoActual.some((item) => item.id === producto.id);

    if (existe) {
      return carritoActual.map((item) => {
        if (item.id === producto.id && Number(item.unidades) + 1 <= stock) {
          return { ...item, unidades: Number(item.unidades) + 1 };
        }

        return item;
      });
    }

    return [...carritoActual, { ...producto, unidades: 1 }];
  });
}

  async function cobrar(carrito) {
    const res = await fetch("/api/venta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carrito),
    });
    const data = await res.json();

    if (!res.ok) {
      setError_cantidad(data.error ?? "No se pudo completar la venta");
      return;
    }

    await cargarProductos();
    await actualizarDatos();
    setCarrito([]);
    setError_cantidad("");
  }

  function cambiarCantidad(productoId, cambio, productoCantidad) {
    setCarrito((carritoActual) =>
      carritoActual.flatMap((item) => {
        if (item.id !== productoId) {
          return [item];
        }
        setError_cantidad("");
        const unidades = item.unidades + cambio;
        if (productoCantidad < unidades) {
          setError_cantidad("*solo hay " + productoCantidad + " unidades*");
          return [item];
        }
        return unidades > 0 ? [{ ...item, unidades }] : [];
      }),
    );
  }

  function eliminarProducto(productoId) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== productoId),
    );
    setError_cantidad("");
  }

  return (
    <div className={estilos.pagina}>
      <div className={estilos.contenido}>
        <Areacentral
          agregarProducto={agregarProducto}
        />
        <Cobrar
          carrito={carrito}
          cambiarCantidad={cambiarCantidad}
          eliminarProducto={eliminarProducto}
          cobrar={cobrar}
          error_cantidad={error_cantidad}
        />
      </div>
    </div>
  );
}
