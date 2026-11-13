"use client"
import Nav_izquierdo from "@/components/Nav_izquierdo";
import Navbar from "@/components/Navbar";
import Areacentral from "@/components/Areacentral";
import Cobrar from "@/components/Cobrar";
import estilos from "./page.module.css";
import { useState } from "react";

export default function Home() {
  const [carrito, setCarrito] = useState([]);

  function agregarProducto(producto) {
    setCarrito((carritoActual) => {
      const existe = carritoActual.some((item) => item.id === producto.id);

      if (existe) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? { ...item, unidades: item.unidades + 1 }
            : item,
        );
      }

      return [...carritoActual, { ...producto, unidades: 1 }];
    });
  }

  function cambiarCantidad(productoId, cambio) {
    setCarrito((carritoActual) =>
      carritoActual.flatMap((item) => {
        if (item.id !== productoId) {
          return [item];
        }

        const unidades = item.unidades + cambio;
        return unidades > 0 ? [{ ...item, unidades }] : [];
      }),
    );
  }

  function eliminarProducto(productoId) {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== productoId),
    );
  }

  return (
    <div className={estilos.pagina}>
      <Navbar />
      <div className={estilos.contenido}>
        <Nav_izquierdo />
        <Areacentral agregarProducto={agregarProducto}/>
        <Cobrar
          carrito={carrito}
          cambiarCantidad={cambiarCantidad}
          eliminarProducto={eliminarProducto}
        />
      </div>
    </div>
  );
}
