import React, { useState } from "react";

export default function EditarClub() {
  const [clubId, setClubId] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaLocalidad, setNuevaLocalidad] = useState("");
  const [nuevaDireccion, setNuevaDireccion] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Editando club:", { clubId, nuevoNombre, nuevaLocalidad, nuevaDireccion });
    setMensaje("Club actualizado correctamente");
  };

  return (
    <div className="editar-club">
      <style>{`
        .editar-club {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          max-width: 500px;
          width: 100%;
        }
        .editar-club h2 {
          color: #1f3c88;
          margin-bottom: 1rem;
        }
        .editar-club label {
          display: block;
          font-weight: 600;
          margin-top: 1rem;
        }
        .editar-club input {
          width: 100%;
          padding: 0.5rem;
          margin-top: 0.5rem;
          border-radius: 6px;
          border: 1px solid #ccc;
        }
        .editar-club button {
          margin-top: 1.5rem;
          background: #1f3c88;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .editar-club button:hover {
          background: #163074;
        }
        .editar-club .mensaje {
          margin-top: 1rem;
          color: green;
          font-weight: bold;
        }
      `}</style>

      <h2>Editar Club</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="clubId">ID del Club</label>
        <input
          id="clubId"
          type="text"
          value={clubId}
          onChange={(e) => setClubId(e.target.value)}
          required
        />

        <label htmlFor="nuevoNombre">Nuevo Nombre</label>
        <input
          id="nuevoNombre"
          type="text"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />

        <label htmlFor="nuevaLocalidad">Nueva Localidad</label>
        <input
          id="nuevaLocalidad"
          type="text"
          value={nuevaLocalidad}
          onChange={(e) => setNuevaLocalidad(e.target.value)}
        />

        <label htmlFor="nuevaDireccion">Nueva Dirección</label>
        <input
          id="nuevaDireccion"
          type="text"
          value={nuevaDireccion}
          onChange={(e) => setNuevaDireccion(e.target.value)}
        />

        <button type="submit">Guardar Cambios</button>
      </form>

      {mensaje && <div className="mensaje">{mensaje}</div>}
    </div>
  );
}
