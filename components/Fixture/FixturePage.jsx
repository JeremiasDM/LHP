import React, { useState } from 'react';
import RegistrarFixture from '../components/Fixture/RegistrarFixture';
import ListaFixture from '../components/Fixture/ListaFixture';
import EditarFixture from '../components/Fixture/EditarFixture';

const FixturePage = () => {
  const [jornadas, setJornadas] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [jornadaSeleccionada, setJornadaSeleccionada] = useState(null);

  const agregarJornada = (nuevaJornada) => {
    // Asignar horarios automáticos si hay más de un partido
    const bloques = 40; // minutos por partido
    const base = nuevaJornada.hora;
    const [h, m] = base.split(":").map(Number);
    let baseDate = new Date();
    baseDate.setHours(h);
    baseDate.setMinutes(m);

    const partidosConHora = nuevaJornada.partidos.map((p, index) => {
      const partidoHora = new Date(baseDate.getTime() + index * bloques * 60000);
      const hh = partidoHora.getHours().toString().padStart(2, '0');
      const mm = partidoHora.getMinutes().toString().padStart(2, '0');
      return { ...p, hora: `${hh}:${mm}` };
    });

    const jornadaConHorarios = {
      ...nuevaJornada,
      partidos: partidosConHora
    };

    setJornadas([...jornadas, jornadaConHorarios]);
  };

  const iniciarEdicion = (jornada) => {
    setJornadaSeleccionada(jornada);
    setModoEdicion(true);
  };

  const salirEdicion = () => {
    setModoEdicion(false);
    setJornadaSeleccionada(null);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#0B0E19', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '30px' }}>Gestión del Fixture</h1>

      {modoEdicion ? (
        <EditarFixture jornada={jornadaSeleccionada} salirEdicion={salirEdicion} />
      ) : (
        <>
          <RegistrarFixture agregarJornada={agregarJornada} />
          <hr style={{ margin: '30px 0', borderColor: '#FFFFFF88' }} />
          <ListaFixture jornadas={jornadas} onEditar={iniciarEdicion} />
        </>
      )}
    </div>
  );
};

export default FixturePage;
