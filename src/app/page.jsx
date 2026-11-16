"use client";
import Nav_izquierdo from "@/components/Nav_izquierdo";
import Navbar from "@/components/Navbar";
import Areacentral from "@/components/Areacentral";
import Cobrar from "@/components/Cobrar";
import estilos from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [carrito, setCarrito] = useState([]);
  const [versionProductos, setVersionProductos] = useState(0);
  const [error_cantidad, setError_cantidad] = useState("");

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
    console.log(data);
    setCarrito([]);
    setVersionProductos((version) => version + 1);
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
      <Navbar />
      <div className={estilos.contenido}>
        <Nav_izquierdo />
        <Areacentral
          agregarProducto={agregarProducto}
          versionProductos={versionProductos}
        />
        <Cobrar
          carrito={carrito}
          cambiarCantidad={cambiarCantidad}
          eliminarProducto={eliminarProducto}
          cobrar={cobrar}
          versionProductos={versionProductos}
          error_cantidad={error_cantidad}
        />
      </div>
    </div>
  );
}
