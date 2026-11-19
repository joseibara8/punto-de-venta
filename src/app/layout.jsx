import "./globals.css";
import { ProductosProvider } from "@/context/ProductosContext";
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
        <ProductosProvider>
          <div className={estilos.aplicacion}>
            <Nav_izquierdo />
            <main className={estilos.contenido}>{children}</main>
          </div>
        </ProductosProvider>
      </body>
    </html>
  );
}
