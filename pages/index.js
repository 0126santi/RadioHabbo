import { useEffect, useState } from "react";

export default function Home() {
  const [hora, setHora] = useState("Cargando...");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    async function actualizarHoraFecha() {
      try {
        const res = await fetch('/api/hora');
        const data = await res.json();
        const match = data.hora.match(/(\d{2}:\d{2})\s*([AP]M)/i);
        let horaHtml;
        if (match) {
          horaHtml = (
            <>
              <span>{match[1]}</span> <span className="ampm">{match[2].toUpperCase()}</span>
            </>
          );
        } else {
          horaHtml = <span>{data.hora}</span>;
        }
        setHora(horaHtml);
        setFecha(data.fecha.charAt(0).toUpperCase() + data.fecha.slice(1));
      } catch (e) {
        setHora("Error");
        setFecha("");
      }
    }
    actualizarHoraFecha();
    const interval = setInterval(actualizarHoraFecha, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Banner superior */}
      <div className="banner">
        <div className="banner-content">
          <img src="/imagenes/foto.jpeg" alt="Foto" className="banner-foto" />
          <h1 className="banner-titulo">RADIO</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="main-content">
        <div className="left-content">
          {/* Reproductor de radio */}
          <audio controls autoPlay>
            <source src="https://icecast-railway-production.up.railway.app/stream" type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
          {/* Descripción */}
          <div className="info-row">
            <div className="mensaje">
              <h2>Welcome to the website</h2>
              <p>Escucha nuestra transmisión en vivo </p>
            </div>
            {/* Hora y fecha */}
            <div className="hora-fecha">
              <div className="titulo-hora">Hora Venezuela</div>
              <div id="horaDigital">{hora}</div>
              <div id="fechaDigital">{fecha}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}