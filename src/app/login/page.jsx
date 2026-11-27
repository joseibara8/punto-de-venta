"use client";

import Link from "next/link";
import estilos from "./page.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Login() {
    const [nombre,setNombre] = useState("");
    const [contraseña,setContraseña] = useState("");
    const [mensaje,setMensaje] = useState("");
    const router = useRouter();
  
  async function login(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
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
      router.push("/");
    
 
  }
  return (
    <div className={estilos.pagina}>
      <section className={estilos.tarjeta} aria-labelledby="titulo-login">
        <div className={estilos.icono} aria-hidden="true">
          <i className="fi fi-rr-user" />
        </div>
        <p className={estilos.etiqueta}>MI NEGOCIO</p>
        <h1 id="titulo-login">Iniciar sesión</h1>
        <p className={estilos.descripcion}>Ingresa a tu punto de venta.</p>

        <form className={estilos.formulario} >
          <label htmlFor="login-nombre">Nombre</label>
          <input
            id="login-nombre"
            name="nombre"
            type="text"
            autoComplete="username"
            placeholder="Escribe tu nombre"
            onChange={(e) => setNombre(e.target.value)}
            required
          />

          <label htmlFor="login-contrasena">Contraseña</label>
          <input
            id="login-contrasena"
            name="contrasena"
            type="password"
            autoComplete="current-password"
            placeholder="Escribe tu contraseña"
            onChange={(e) => setContraseña(e.target.value)}
            required
          />

          <button onClick={login}>Iniciar sesión</button>
        </form>

        <p className={estilos.pie}>
          ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
        </p>
      </section>
    </div>
  );
}
