import {
  useEffect,
  useState,
} from "react";

import {
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";

import {
  realtimeDb,
} from "../firebase/config";

import type {
  Tarea,
} from "../types/Tarea";

const tareasVacias: Tarea[] =
  [];

export function useTareasRealtime() {
  const [tareas, setTareas] =
    useState(tareasVacias);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const referencia =
      ref(
        realtimeDb,
        "tasks"
      );

    const cancelar =
      onValue(
        referencia,
        (snapshot) => {
          const datos =
            snapshot.val();

          if (!datos) {
            setTareas([]);
            return;
          }

          const lista: Tarea[] =
            Object.keys(
              datos
            ).map((id) => {
              return {
                id: id,

                titulo:
                  datos[id]
                    .titulo ?? "",

                completada:
                  datos[id]
                    .completada ??
                  false,

                createdAt:
                  datos[id]
                    .createdAt ?? "",
              };
            });

          setTareas(lista);
        }
      );

    return cancelar;
  }, []);

  async function add(
    titulo: string
  ) {
    try {
      setError("");

      await push(
        ref(
          realtimeDb,
          "tasks"
        ),
        {
          titulo: titulo,
          completada: false,

          createdAt:
            new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error(error);

      setError(
        "No fue posible agregar la tarea"
      );
    }
  }

  async function update(
    id: string,
    titulo: string,
    completada: boolean,
    createdAt: string
  ) {
    try {
      setError("");

      await set(
        ref(
          realtimeDb,
          `tasks/${id}`
        ),
        {
          titulo: titulo,

          completada:
            completada,

          createdAt:
            createdAt,

          updatedAt:
            new Date().toISOString(),
        }
      );
    } catch (error) {
      console.error(error);

      setError(
        "No fue posible actualizar la tarea"
      );
    }
  }

  async function deleteItem(
    id: string
  ) {
    try {
      setError("");

      await remove(
        ref(
          realtimeDb,
          `tasks/${id}`
        )
      );
    } catch (error) {
      console.error(error);

      setError(
        "No fue posible eliminar la tarea"
      );
    }
  }

  return {
    tareas,
    error,
    add,
    update,
    deleteItem,
  };
}