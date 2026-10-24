import type {
  MisionInfo,
  Progreso,
} from "../types/Mision";

export const misionesInfo: MisionInfo[] = [
  {
    id: 1,
    nombre: "Evidencia",
    descripcion:
      "Toma una fotografía como evidencia.",
    puntos: 40,
    ruta: "/mission/photo",
  },
  {
    id: 2,
    nombre: "Movimiento real",
    descripcion:
      "Aléjate 10 metros desde tu posición inicial.",
    puntos: 40,
    ruta: "/mission/movement",
  },
  {
    id: 3,
    nombre: "Permanencia activa",
    descripcion:
      "Mantente quieto durante 10 segundos.",
    puntos: 40,
    ruta: "/mission/stay",
  },
];

export const progresoInicial: Progreso = {
  points: 0,

  missions: [
    {
      id: 1,
      completed: false,
    },
    {
      id: 2,
      completed: false,
    },
    {
      id: 3,
      completed: false,
    },
  ],
};