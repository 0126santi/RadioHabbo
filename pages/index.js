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

  // Cargar el script externo del reproductor solo una vez
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//cdn.cloud.caster.fm/widgets/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
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
          <div className="reproductor">
            <div
              data-type="newStreamPlayer"
              data-publicToken="8dbc7080-19f5-475b-a777-c58d74d65be7"
              data-theme="dark"
              data-color="e81e4d"
              data-channelid=""
              data-rendered="false"
              className="cstrEmbed"
            >
              <a href="https://www.caster.fm">Shoutcast Hosting</a>
              <a href="https://www.caster.fm">Stream Hosting</a>
              <a href="https://www.caster.fm">Radio Server Hosting</a>
            </div>
          </div>
          {/* Descripción */}
          <div className="info-row">
            <div className="mensaje">
              <h2>Welcome to the website</h2>
              <p>Escucha nuestra transmisión en vivo </p>
            </div>
            {/* Keko de Habbo */}
            <img
              src="https://www.habbo.es/habbo-imaging/avatarimage?user=rojosantrix&action=std&direction=2&head_direction=2&size=l"
              alt="Keko de Habbo"
              style={{
                imageRendering: "pixelated",
                width: "auto",
                height: "160px",
                marginRight: "20px",
                marginLeft: "20px"
              }}
            />
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