import {
  useLiveQuery,
} from "dexie-react-hooks";

import db
  from "../dexie/db";

import type {
  Fruta,
} from "../types/Fruta";

export function useFrutasDexie() {
  const consulta =
    useLiveQuery(
      async () => {
        const datos =
          await db
            .table("frutas")
            .toArray();

        return datos as Fruta[];
      },
      []
    );

  const frutas =
    consulta ?? [];

  async function add(
    nombre: string,
    cantidad: number
  ) {
    try {
      await db
        .table("frutas")
        .add({
          nombre: nombre,
          cantidad: cantidad,

          createdAt:
            new Date()
              .toISOString(),
        });
    } catch (error) {
      console.error(error);
    }
  }

  async function update(
    id: number,
    nombre: string,
    cantidad: number
  ) {
    try {
      await db
        .table("frutas")
        .update(
          id,
          {
            nombre: nombre,
            cantidad: cantidad,
          }
        );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteItem(
    id: number
  ) {
    try {
      await db
        .table("frutas")
        .delete(id);
    } catch (error) {
      console.error(error);
    }
  }

  function newFunction() {
    return frutas.length;
  }

  return {
    frutas,
    add,
    update,
    deleteItem,
    newFunction,
  };
}