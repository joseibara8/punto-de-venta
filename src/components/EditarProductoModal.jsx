"use client";

import { useState } from "react";
import estilos from "./editarProductoModal.module.css";

function crearFormulario(producto) {
  return {
    nombre: producto.nombre ?? "",
    categoria: producto.categoria ?? "",
    precio: producto.precio ?? "",
    costo: producto.costo ?? "",
    cantidad: producto.cantidad ?? "",
  };
}

export default function EditarProductoModal({ producto, onCerrar, onGuardado }) {
  const [formulario, setFormulario] = useState(() => crearFormulario(producto));
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  function cambiarCampo(evento) {
    setFormulario((actual) => ({
      ...actual,
      [evento.target.name]: evento.target.value,
    }));
  }

  async function guardar(evento) {
    evento.preventDefault();
    setGuardando(true);
    setError("");

    try {
      const respuesta = await fetch("/api/productos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: producto.id, ...formulario }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error ?? "No se pudo actualizar el producto");
      }

      await onGuardado();
    } catch (error) {
      setError(error.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className={estilos.fondo} onMouseDown={onCerrar}>
      <div
        className={estilos.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-editar-producto"
        onMouseDown={(evento) => evento.stopPropagation()}
      >
        <button className={estilos.boton_cerrar} type="button" onClick={onCerrar}>
          <i className="fi fi-rr-cross" aria-hidden="true"></i>
        </button>
        <h2 id="titulo-editar-producto">Editar producto</h2>
        <p className={estilos.subtitulo}>Actualiza la información del producto</p>

        <form onSubmit={guardar}>
          <label>
            Nombre del producto
            <input name="nombre" value={formulario.nombre} onChange={cambiarCampo} required />
          </label>

          <div className={estilos.dos_columnas}>
            <label>
              Categoría
              <input name="categoria" value={formulario.categoria} onChange={cambiarCampo} required />
            </label>
            <label>
              Precio de venta
              <input name="precio" type="number" min="0" step="0.01" value={formulario.precio} onChange={cambiarCampo} required />
            </label>
          </div>

          <div className={estilos.dos_columnas}>
            <label>
              Costo
              <input name="costo" type="number" min="0" step="0.01" value={formulario.costo} onChange={cambiarCampo} required />
            </label>
            <label>
              Existencias actuales
              <input name="cantidad" type="number" min="0" step="0.001" value={formulario.cantidad} onChange={cambiarCampo} required />
            </label>
          </div>

          {error && <p className={estilos.error} role="alert">{error}</p>}

          <div className={estilos.acciones}>
            <button className={estilos.boton_cancelar} type="button" onClick={onCerrar}>
              Cancelar
            </button>
            <button className={estilos.boton_guardar} type="submit" disabled={guardando}>
              {guardando ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
