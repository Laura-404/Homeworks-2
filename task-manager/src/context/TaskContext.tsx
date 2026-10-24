import {
  createContext,
} from "react";

import type {
  ReactNode,
} from "react";

import type {
  Tarea,
} from "../types/Tarea";

import {
  useTareas,
} from "../hooks/useTareas";

const tareasVacias: Tarea[] = [];

export const TaskContext =
  createContext({
    tareas: tareasVacias,

    agregarTarea: (
      _titulo: string
    ) => {},

    editarTarea: (
      _id: number,
      _titulo: string
    ) => {},

    completarTarea: (
      _id: number
    ) => {},

    eliminarTarea: (
      _id: number
    ) => {},
  });

type PropiedadesProveedor = {
  children: ReactNode;
};

export function TaskProvider({
  children,
}: PropiedadesProveedor) {
  const tareasContexto =
    useTareas();

  return (
    <TaskContext.Provider
      value={tareasContexto}
    >
      {children}
    </TaskContext.Provider>
  );
}