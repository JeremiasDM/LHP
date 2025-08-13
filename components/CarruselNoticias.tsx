import React, { useState, useEffect } from "react";
import type { Noticia } from "./types/noticia";

const CarruselNoticias: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [indice, setIndice] = useState(0);

  useEffect(() => {
    const guardadas = localStorage.getItem("noticias");
    if (guardadas) {
      setNoticias(JSON.parse(guardadas).slice(0, 5)); // máximo 5 noticias
    }
  }, []);

  useEffect(() => {
    if (noticias.length > 1) {
      const timer = setInterval(() => {
        setIndice((prev) => (prev + 1) % noticias.length);
      }, 5000); // cambia cada 5 seg
      return () => clearInterval(timer);
    }
  }, [noticias]);

  if (noticias.length === 0) {
    return <p>No hay noticias para mostrar.</p>;
  }

  const noticiaActual = noticias[indice];

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ position: "relative" }}>
        {noticiaActual.imagenUrl && (
          <img
            src={noticiaActual.imagenUrl}
            alt={noticiaActual.titulo}
            style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "8px" }}
          />
        )}
        <div style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          padding: "1rem",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px"
        }}>
          <h3>{noticiaActual.titulo}</h3>
          <p>{noticiaActual.resumen}</p>
        </div>
      </div>

      {/* Botones de navegación */}
      <button
        onClick={() => setIndice((prev) => (prev - 1 + noticias.length) % noticias.length)}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          cursor: "pointer"
        }}
      >
        ◀
      </button>
      <button
        onClick={() => setIndice((prev) => (prev + 1) % noticias.length)}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          cursor: "pointer"
        }}
      >
        ▶
      </button>
    </div>
  );
};

export default CarruselNoticias;
