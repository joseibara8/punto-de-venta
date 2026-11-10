import "./globals.css";

export const metadata = {
  title: "Jose Ibarra | Desarrollador Full Stack",
  description:
    "Portafolio de Jose Benjamín Ibarra Sánchez, desarrollador Full Stack.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" data-theme="light">
      <body>
        {children}
      </body>
    </html>
  );
}