import React, { useState } from 'react';

const ListaJugadores = ({ jugadores, onEditar, onEliminar }) => {
  const [filtroClub, setFiltroClub] = useState('');

  const hoy = new Date().toISOString().split('T')[0];

  // Obtener clubes únicos para el filtro
  const clubsUnicos = [...new Set(jugadores.map(j => j.club))];

  // Aplicar filtro
  const jugadoresFiltrados = filtroClub
    ? jugadores.filter(j => j.club === filtroClub)
    : jugadores;

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Lista de jugadores</h3>

      {/* Filtro por club */}
      {clubsUnicos.length > 0 && (
        <div style={{ marginBottom: '10px' }}>
          <label>Filtrar por club:</label>
          <select
            value={filtroClub}
            onChange={(e) => setFiltroClub(e.target.value)}
            style={{ marginLeft: '5px', padding: '5px' }}
          >
            <option value="">Todos</option>
            {clubsUnicos.map((club, index) => (
              <option key={index} value={club}>{club}</option>
            ))}
          </select>
        </div>
      )}

      {jugadoresFiltrados.length === 0 ? (
        <p>No hay jugadores para mostrar.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#0B0E19', color: '#FFFFFF' }}>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>Nombre</th>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>Apellido</th>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>DNI</th>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>Club</th>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>Estado ficha</th>
              <th style={{ border: '1px solid #ccc', padding: '5px' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {jugadoresFiltrados.map((jugador, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '5px' }}>{jugador.nombre}</td>
                <td style={{ border: '1px solid #ccc', padding: '5px' }}>{jugador.apellido}</td>
                <td style={{ border: '1px solid #ccc', padding: '5px' }}>{jugador.dni}</td>
                <td style={{ border: '1px solid #ccc', padding: '5px' }}>{jugador.club}</td>
                <td style={{ border: '1px solid #ccc', padding: '5px' }}>
                  {jugador.vencimientoFicha && jugador.vencimientoFicha < hoy ? (
                    <span style={{ color: 'red' }}>⚠ Vencida</span>
                  ) : (
                    <span style={{ color: 'lightgreen' }}>Vigente</span>
                  )}
                </td>
                <td style={{ border: '1px solid #ccc', padding: '5px' }}>
                  <button
                    onClick={() => onEditar(jugador)}
                    style={{ marginRight: '5px', padding: '3px 6px' }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onEliminar(jugador.dni)}
                    style={{ padding: '3px 6px', backgroundColor: 'red', color: 'white' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaJugadores;
