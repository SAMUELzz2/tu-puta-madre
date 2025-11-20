import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [num, setNum] = useState(0);
  const [texto, setTexto] = useState("");

  const botones = ["Macro 1", "Macro 2", "Macro 3"];

  const [respuesta, setRespuesta] = useState("");
  const [mostrarEaster, setMostrarEaster] = useState(false);

  function verificarRespuesta() {
    if (respuesta.trim().toLowerCase() === "humano") {
      setMostrarEaster(true);
    } else {
      alert("Nel cabrón, no es esa.");
    }
  }


  async function escogerCarpetas() {
    const ruta = await window.api.seleccionarCarpeta();
    console.log("Carpeta", ruta);
  }


  async function leer() {
    const ruta = await window.api.seleccionarCarpeta();
    if (!ruta) return;

    const archivos = await window.api.leerCarpeta(ruta);
    console.log("Contenido:", archivos);
  }

  async function borrar() {
    const ruta = await window.api.seleccionarCarpeta();
    if (!ruta) return;

    const res = await window.api.borrarCarpeta(ruta);
    alert(res === "ok" ? "Borrado" : "Error");
  }

  useEffect(() => {
    
    window.api.onMensaje((texto) => {
      alert("Electron dice: " + texto);
    });
  }, []); 

return (
  <>
    <div className="bg-text">NGSM</div>

    <div className="container">
      <div className="card">

        <h1 className="titulo">NGSM</h1>

        <input
          className="input"
          placeholder="Escribe algo, baboso"
          onChange={(e) => setTexto(e.target.value)}
        />

        <p className="texto-salida">{texto}</p>

        <div className="botones">
          <button className="btn" onClick={escogerCarpetas}>Seleccionar</button>
          <button className="btn" onClick={leer}>Leer</button>
          <button className="btn" onClick={borrar}>Borrar</button>
        </div>

        <div className="grid-botones">
          <button className="btn-macro">Macro 1</button>
          <button className="btn-macro">Macro 2</button>
          <button className="btn-macro">Macro 3</button>
        </div>

      </div>
    </div>

    
  </>
);
}

export default App;
