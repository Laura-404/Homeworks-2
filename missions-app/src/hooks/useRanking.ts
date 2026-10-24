import {
  useState,
} from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import {
  firestoreDb,
} from "../firebase/config";

import type {
  UsuarioRanking,
} from "../types/Ranking";

const rankingVacio:
  UsuarioRanking[] = [];

export function useRanking() {
  const [
    usuarios,
    setUsuarios,
  ] = useState(
    rankingVacio
  );

  const [cargando, setCargando] =
    useState(false);

  async function cargarRanking() {
    try {
      setCargando(true);

      const resultado =
        await getDocs(
          collection(
            firestoreDb,
            "usuarios"
          )
        );

      const lista:
        UsuarioRanking[] =
        resultado.docs.map(
          (documento) => {
            const datos =
              documento.data();

            return {
              uid:
                documento.id,

              email:
                datos.email ??
                "Sin correo",

              points:
                datos.points ?? 0,
            };
          }
        );

      lista.sort(
        (usuarioA, usuarioB) =>
          usuarioB.points -
          usuarioA.points
      );

      setUsuarios(
        lista.slice(0, 5)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  }

  return {
    usuarios,
    cargando,
    cargarRanking,
  };
}