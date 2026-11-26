"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
async function consultar(url, mensajeError) {
  const respuesta = await fetch(url);
  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.error ?? mensajeError);
  }

  return datos;
}

const VentasContext = createContext(null);

export function VentasProvider({ children }) {
  const [caja, setCaja] = useState([]);
  const [cargandoCaja, setCargandoCaja] = useState(true);
  const [errorCaja, setErrorCaja] = useState("");
  const [ventas, setVentas] = useState([]);
  const [cargandoVentas, setCargandoVentas] = useState(true);
  const [errorVentas, setErrorVentas] = useState("");

  const actualizarDatos = useCallback(async () => {
    setCargandoCaja(true);
    setCargandoVentas(true);
    setErrorCaja("");
    setErrorVentas("");

    const [resultadoCaja, resultadoVentas] = await Promise.allSettled([
      consultar("/api/caja", "No se pudo cargar la caja"),
      consultar("/api/venta", "No se pudieron cargar las ventas"),
    ]);

    if (resultadoCaja.status === "fulfilled") {
      setCaja(resultadoCaja.value);
    } else {
      setErrorCaja(resultadoCaja.reason.message);
    }

    if (resultadoVentas.status === "fulfilled") {
      setVentas(resultadoVentas.value);
    } else {
      setErrorVentas(resultadoVentas.reason.message);
    }

    setCargandoCaja(false);
    setCargandoVentas(false);
  }, []);

  useEffect(() => {
    actualizarDatos();
  }, [actualizarDatos]);

  return (
    <VentasContext.Provider
      value={{
        caja,
        cargandoCaja,
        errorCaja,
        ventas,
        cargandoVentas,
        errorVentas,
        actualizarDatos,
      }}
    >
      {children}
    </VentasContext.Provider>
  );
}

export function useVentas() {
  return useContext(VentasContext);
}
