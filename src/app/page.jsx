import Nav_izquierdo from "@/components/Nav_izquierdo"
import Navbar from "@/components/Navbar";
import Areacentral from "@/components/Areacentral";
import estilos from "./page.module.css";

export default function Home() {
  return (
    <div className={estilos.pagina}>
      <Navbar />
      <div className={estilos.contenido}>
        <Nav_izquierdo />
        <Areacentral />
        
      </div>
    </div>
  )
}
