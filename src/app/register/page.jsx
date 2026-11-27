"use client";

import Link from "next/link";
import estilos from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Register() {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
    const router = useRouter();

  async function registrar(e) {
  e.preventDefault();

  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      contraseña,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    setMensaje(data.mensaje);
    return;
  }
  console.log(data);
  

  router.push("/login");
}

  return (
    <div className={estilos.pagina}>
      <section className={estilos.tarjeta} aria-labelledby="titulo-register">
        <div className={estilos.icono} aria-hidden="true">
          <i className="fi fi-rr-user-add" />
        </div>
        <p className={estilos.etiqueta}>MI NEGOCIO</p>
        <h1 id="titulo-register">Crear cuenta</h1>
        <p className={estilos.descripcion}>Regístrate para comenzar.</p>

        <form className={estilos.formulario}>
          <label htmlFor="register-nombre">Nombre</label>
          <input
            id="register-nombre"
            name="nombre"
            type="text"
            autoComplete="username"
            placeholder="Escribe tu nombre"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label htmlFor="register-contrasena">Contraseña</label>
          <input
            id="register-contrasena"
            name="contrasena"
            type="password"
            autoComplete="new-password"
            placeholder="Crea una contraseña"
            required
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />

          <button onClick={registrar}>Registrarse</button>
        </form>

        <p className={estilos.pie}>
          ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
        </p>
      </section>
    </div>
  );
}
