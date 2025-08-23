export type Encuentro = {
  jornada: number;
  grupo: 'A' | 'B';
  club1: string;
  club2: string;
  resultado: string;
};

export type Fixture = {
  fecha: string;
  lugar: string;
  partidos: Encuentro[];
};