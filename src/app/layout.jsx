import "./globals.css";

export const metadata = {
  title: "Punto de venta",
  description: "Sistema de punto de venta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="light">
      <body>{children}</body>
    </html>
  );
}