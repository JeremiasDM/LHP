import { useEffect, useState } from "react";
import Autoridades from "./Autoridades";
import VerClubes from "./VerClub";
import VerJugadores from "./VerJugadores";
import FixturePage from "./FixturePage";
import Historia from "./Historia";

export default function App() {
  const [vista, setVista] = useState<"inicio" | "autoridades" | "clubes" | "jugadores" | "fixture" | "historia">(() => {
    return (localStorage.getItem("vista") as any) || "inicio";
  });

  useEffect(() => {
    localStorage.setItem("vista", vista);
  }, [vista]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          font-family: 'Inter', sans-serif;
          background-color: #f0f2f5;
          color: #333;
          height: 100%;
        }

        .app {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        header {
          background-color: #1f3c88;
          color: white;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: bold;
          font-size: 1.25rem;
        }

        .logo img {
          width: 40px;
          height: 40px;
        }

        nav {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        nav button {
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        }

        nav button:hover {
          text-decoration: underline;
        }

        main {
          flex: 1;
          padding: 2rem;
          display: flex;
          justify-content: center;
        }

        .grid {
          display: grid;
          gap: 2rem;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          width: 100%;
          max-width: 1200px;
        }

        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s;
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }

        .card-content {
          padding: 1rem;
        }

        .card-content h2 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #1f3c88;
        }

        .card-content p {
          font-size: 0.95rem;
          color: #555;
        }

        .sponsors {
          grid-column: 1 / -1;
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }

        .sponsors h2 {
          margin-bottom: 1rem;
          color: #1f3c88;
        }

        .sponsor-logos {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 2rem;
        }

        .sponsor-logos img {
          height: 40px;
          object-fit: contain;
          opacity: 0.8;
          transition: opacity 0.3s;
        }

        .sponsor-logos img:hover {
          opacity: 1;
        }

        footer {
          background: #1f3c88;
          color: white;
          text-align: center;
          padding: 1rem;
          font-size: 0.9rem;
        }
      `}</style>

      <div className="app">
        <header>
          <div className="logo">
            <img src="/Logo.png" alt="Logo" />
            Liga Recreativa Handball Punilla 
          </div>
          <nav>
            <button onClick={() => setVista("inicio")}>Inicio</button>
            <button>Noticias</button>
            <button onClick={() => setVista("fixture")}>Fixture</button>
            <button onClick={() => setVista("jugadores")}>Jugadores</button>
            <button onClick={() => setVista("clubes")}>Clubes</button>
            <button onClick={() => setVista("autoridades")}>Autoridades</button>
            <button onClick={() => setVista("historia")}>Historia</button>
            <button>Iniciar Sesión</button>
          </nav>
        </header>

        <main>
          {vista === "inicio" && (
            <div className="grid">
              <div className="card">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" alt="Noticia" />
                <div className="card-content">
                  <h2>Últimas Noticias</h2>
                  <p>El equipo suma una nueva victoria clave de cara a los playoffs.</p>
                </div>
              </div>
              <div className="card">
                <img src="https://images.unsplash.com/photo-1508520871429-62c0f6457add?auto=format&fit=crop&w=1200&q=80" alt="Fixture" />
                <div className="card-content">
                  <h2>Fixture</h2>
                  <p>Consulta el calendario actualizado de partidos para esta temporada.</p>
                </div>
              </div>
              <div className="card">
                <img src="https://images.unsplash.com/photo-1589396575652-3794f26a9ab6?auto=format&fit=crop&w=1200&q=80" alt="Partido" />
                <div className="card-content">
                  <h2>Último Partido</h2>
                  <p>Una gran actuación del equipo con remontada en el segundo tiempo.</p>
                </div>
              </div>
              <div className="card">
                <img src="https://images.unsplash.com/photo-1601645193272-d6f1dc7c07ae?auto=format&fit=crop&w=1200&q=80" alt="Jugador" />
                <div className="card-content">
                  <h2>Jugador Destacado</h2>
                  <p>Juan Pérez lidera con 5 goles y 2 asistencias en los últimos 3 partidos.</p>
                </div>
              </div>
              <div className="sponsors">
                <h2>Nuestros Sponsors</h2>
                <div className="sponsor-logos">
                  <a href="https://www.instagram.com/cristiandiaznailsandmakeup/" target="_blank" rel="noopener noreferrer">
                    <img src="./Cris.jpg" alt="Velez" />
                  </a>
                  <a href="https://www.go7.com.ar/" target="_blank" rel="noopener noreferrer">
                    <img src="/go7-2.png" alt="Go7" />
                  </a>
                  <a href="https://danal.ddfabrica.com/productos/" target="_blank" rel="noopener noreferrer">
                    <img src="./Danal.png" alt="Danal" />
                  </a>
                  <a href="https://www.kempaoficial.com/" target="_blank" rel="noopener noreferrer">
                    <img src="/Kempa.jpg" alt="Kempa" />
                  </a>
                </div>
              </div>
            </div>
          )}
          {vista === "autoridades" && <Autoridades />}
          {vista === "clubes" && <VerClubes />}
          {vista === "jugadores" && <VerJugadores />}
          {vista === "Partidos" && <FixturePage />}
          {vista === "historia" && <Historia />}
        </main>

        <footer>
          &copy; 2025 Liga Deportiva - Todos los derechos reservados.
        </footer>
      </div>
    </>
  );
}
