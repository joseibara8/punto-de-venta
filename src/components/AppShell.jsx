"use client";

import { usePathname } from "next/navigation";
import { ProductosProvider } from "@/context/ProductosContext";
import { VentasProvider } from "@/context/VentasContext";
import Navbar from "@/components/Navbar";
import Nav_izquierdo from "@/components/Nav_izquierdo";
import estilos from "@/app/layout.module.css";

export default function AppShell({ children }) {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/register") {
    return <main>{children}</main>;
  }

  return (
    <VentasProvider>
      <ProductosProvider>
        <div className={estilos.aplicacion}>
          <Nav_izquierdo />
          <div className={estilos.contenido}>
            <Navbar />
            <main>{children}</main>
          </div>
        </div>
      </ProductosProvider>
    </VentasProvider>
  );
}
