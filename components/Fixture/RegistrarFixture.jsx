import React, { useState } from 'react';

const RegistrarFixture = ({ agregarJornada }) => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [lugar, setLugar] = useState('');
  const [partidos, setPartidos] = useState([]);
  const [nuevoPartido, setNuevoPartido] = useState({ equipoA: '', equipoB: '', categoria: '', arbitro: '' });

  const handleAgregarPartido = () => {
    if (!nuevoPartido.equipoA || !nuevoPartido.equipoB || !nuevoPartido.categoria || !nuevoPartido.arbitro) {
      alert('Todos los campos del partido son obligatorios');
      return;
    }
    setPartidos([...partidos, nuevoPartido]);
    setNuevoPartido({ equipoA: '', equipoB: '', categoria: '', arbitro: '' });
  };

  const handleGuardarJornada = () => {
    if (!fecha || !hora || !lugar || partidos.length === 0) {
      alert('Completa todos los campos y agrega al menos un partido');
      return;
    }
    const jornada = {
      fecha,
      hora,
      lugar,
      partidos: partidos.map(p => ({ ...p, golesEquipoA: null, golesEquipoB: null, puntosEquipoA: 0, puntosEquipoB: 0, mvp: '', estado: 'Programado' }))
    };
    agregarJornada(jornada);
    setFecha('');
    setHora('');
    setLugar('');
    setPartidos([]);
  };

  return (
    <div style={{ backgroundColor: '#1F3C88', padding: '20px', borderRadius: '10px', color: 'white' }}>
      <h2>Registrar Jornada</h2>

      <label>Fecha:</label>
      <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} /><br />

      <label>Hora de inicio:</label>
      <input type="time" value={hora} onChange={e => setHora(e.target.value)} /><br />

      <label>Lugar:</label>
      <input type="text" value={lugar} onChange={e => setLugar(e.target.value)} /><br />

      <h4>Agregar Partido</h4>
      <input placeholder="Equipo A" value={nuevoPartido.equipoA} onChange={e => setNuevoPartido({ ...nuevoPartido, equipoA: e.target.value })} />
      <input placeholder="Equipo B" value={nuevoPartido.equipoB} onChange={e => setNuevoPartido({ ...nuevoPartido, equipoB: e.target.value })} />
      <select value={nuevoPartido.categoria} onChange={e => setNuevoPartido({ ...nuevoPartido, categoria: e.target.value })}>
        <option value="" disabled>Seleccionar categoría</option>
        <option value="Masculino">Masculino</option>
        <option value="Femenino">Femenino</option>
      </select>
      <input placeholder="Árbitro" value={nuevoPartido.arbitro} onChange={e => setNuevoPartido({ ...nuevoPartido, arbitro: e.target.value })} />
      <button onClick={handleAgregarPartido}>Agregar partido</button>

      <h5>Partidos agregados:</h5>
      <ul>
        {partidos.map((p, i) => (
          <li key={i}>{p.equipoA} vs {p.equipoB} - {p.categoria} - Árbitro: {p.arbitro}</li>
        ))}
      </ul>

      <button onClick={handleGuardarJornada} style={{ marginTop: '10px', backgroundColor: 'green', color: 'white' }}>Guardar Jornada</button>
    </div>
  );
};