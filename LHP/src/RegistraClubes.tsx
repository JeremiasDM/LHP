import React, { useState } from "react";

export default function RegistrarClub() {
  const [nombre, setNombre] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar a la base de datos
    console.log("Registrando club:", { nombre, localidad, direccion });
    setMensaje("Club registrado con éxito");
    setNombre("");
    setLocalidad("");
    setDireccion("");
  };

  return (
    <div className="registro-club">
      <style>{`
        .registro-club {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
        }
        .registro-club h2 {
          color: #1f3c88;
          margin-bottom: 1rem;
        }
        .registro-club label {
          display: block;
          font-weight: 600;
          margin-top: 1rem;
        }
        .registro-club input {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.5rem;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .registro-club button {
          margin-top: 1.5rem;
          background: #1f3c88;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .registro-club button:hover {
          background: #163074;
        }
        .registro-club .mensaje {
          margin-top: 1rem;
          color: green;
          font-weight: bold;
        }
      `}</style>

      <h2>Registrar Nuevo Club</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre del Club</label>
        <input
          id="nombre"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="localidad">Localidad</label>
        <input
          id="localidad"
          type="text"
          value={localidad}
          onChange={(e) => setLocalidad(e.target.value)}
          required
        />

        <label htmlFor="direccion">Dirección</label>
        <input
          id="direccion"
          type="text"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          required
        />

        <button type="submit">Registrar</button>
      </form>

      {mensaje && <div className="mensaje">{mensaje}</div>}
    </div>
  );
}
