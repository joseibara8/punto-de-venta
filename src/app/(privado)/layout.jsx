import { getIronSession } from "iron-session";
import { sessionOptions } from "@/libs/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SessionProvider } from "@/context/SessionContext";
import { ProductosProvider } from "@/context/ProductosContext";
import { VentasProvider } from "@/context/VentasContext";

import Navbar from "@/components/Navbar";
import Nav_izquierdo from "@/components/Nav_izquierdo";
import estilos from "@/app/layout.module.css";

export default async function PrivateLayout({ children }) {
  const session = await getIronSession(
    await cookies(),
    sessionOptions
  );

  if (!session.user?.id) {
    redirect("/login");
  }

  const usuario = {
    id: session.user.id,
    nombre: session.user.nombre,
  };

  return (
    <SessionProvider usuario={usuario}>
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
    </SessionProvider>
  );
}