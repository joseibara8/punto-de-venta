// src/context/ProductosContext.jsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ProductosContext = createContext(null);

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setcargando] = useState(true);
  const [error, setError] = useState("");

  async function cargarProductos() {
    setcargando(true);
    setError("");

    try {
      const respuesta = await fetch("/api/productos");

      
      const datos = await respuesta.json();

      
      if (!respuesta.ok) {
        throw new Error(datos.error ?? "No se pudieron cargar los productos");
      }

      setProductos(datos);
    } catch (error) {
      setError(error.message);
      setProductos([]);
    } finally {
      setcargando(false);
    }
  }

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <ProductosContext.Provider
      value={{ productos, setProductos, cargarProductos, cargando, error }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export function useProductos() {
  return useContext(ProductosContext);
}
