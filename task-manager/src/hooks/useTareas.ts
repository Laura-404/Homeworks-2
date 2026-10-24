import {
  useEffect,
  useState,
} from "react";

import type {
  Tarea,
} from "../types/Tarea";

const tareasIniciales: Tarea[] = [
  {
    id: 1,
    titulo: "Repasar React",
    completada: false,
  },
  {
    id: 2,
    titulo: "Estudiar Ionic",
    completada: false,
  },
];

function cargarTareas() {
  const datos =
    localStorage.getItem(
      "task_manager_tareas"
    );

  if (datos) {
    const tareasGuardadas: Tarea[] =
      JSON.parse(datos);

    return tareasGuardadas;
  }

  return tareasIniciales;
}

export function useTareas() {
  const [tareas, setTareas] =
    useState(cargarTareas());

  useEffect(() => {
    localStorage.setItem(
      "task_manager_tareas",
      JSON.stringify(tareas)
    );
  }, [tareas]);

  function agregarTarea(
    titulo: string
  ) {
    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo: titulo,
      completada: false,
    };

    setTareas(
      (tareasAnteriores) => [
        ...tareasAnteriores,
        nuevaTarea,
      ]
    );
  }

  function editarTarea(
    id: number,
    titulo: string
  ) {
    setTareas(
      (tareasAnteriores) =>
        tareasAnteriores.map(
          (tarea) => {
            if (tarea.id === id) {
              return {
                ...tarea,
                titulo: titulo,
              };
            }

            return tarea;
          }
        )
    );
  }

  function completarTarea(
    id: number
  ) {
    setTareas(
      (tareasAnteriores) =>
        tareasAnteriores.map(
          (tarea) => {
            if (tarea.id === id) {
              return {
                ...tarea,
                completada:
                  !tarea.completada,
              };
            }

            return tarea;
          }
        )
    );
  }

  function eliminarTarea(
    id: number
  ) {
    setTareas(
      (tareasAnteriores) =>
        tareasAnteriores.filter(
          (tarea) =>
            tarea.id !== id
        )
    );
  }

  return {
    tareas,
    agregarTarea,
    editarTarea,
    completarTarea,
    eliminarTarea,
  };
}