import "./globals.css";
import { ProductosProvider } from "@/context/ProductosContext";
import { VentasProvider } from "@/context/VentasContext";
import Navbar from "@/components/Navbar";
import Nav_izquierdo from "@/components/Nav_izquierdo";
import estilos from "./layout.module.css";

export const metadata = {
  title: "Jose Ibarra | Desarrollador Full Stack",
  description:
    "Portafolio de Jose Benjamín Ibarra Sánchez, desarrollador Full Stack.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="light">
      <body>
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
      </body>
    </html>
  );
}
