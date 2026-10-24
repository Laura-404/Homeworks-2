export type EstadoMision = {
  id: number;
  completed: boolean;
};

export type Progreso = {
  points: number;
  missions: EstadoMision[];
};

export type MisionInfo = {
  id: number;
  nombre: string;
  descripcion: string;
  puntos: number;
  ruta: string;
};