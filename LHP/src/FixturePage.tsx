import React, { useState } from "react";
import RegistrarFixture from "./RegistrarFixture";
import EditarFixture from "./EditarFixture";
import ListaFixture from "./ListaFixture";
import type { Fixture } from "./types";

const FixturePage: React.FC = () => {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [fixtureEditando, setFixtureEditando] = useState<Fixture | null>(null);
  const [indiceEditando, setIndiceEditando] = useState<number | null>(null);

  const agregarFixture = (nuevo: Fixture) => {
    setFixtures([...fixtures, nuevo]);
  };

  const editarFixture = (fixture: Fixture, index: number) => {
    setFixtureEditando(fixture);
    setIndiceEditando(index);
  };

  const guardarEdicion = (actualizado: Fixture) => {
    if (indiceEditando === null) return;
    const nuevas = [...fixtures];
    nuevas[indiceEditando] = actualizado;
    setFixtures(nuevas);
    cancelarEdicion();
  };

  const cancelarEdicion = () => {
    setFixtureEditando(null);
    setIndiceEditando(null);
  };

  return (
    <div>
      <h2>Gestión de Fixture</h2>
      {fixtureEditando ? (
        <EditarFixture fixture={fixtureEditando} onGuardar={guardarEdicion} onCancelar={cancelarEdicion} />
      ) : (
        <RegistrarFixture onAgregarFixture={agregarFixture} />
      )}

      <hr />
      <ListaFixture fixtures={fixtures} onEdit={editarFixture} />
    </div>
  );
};

export default FixturePage;
