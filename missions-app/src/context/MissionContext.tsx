import {
  createContext,
  useContext,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  progresoInicial,
} from "../data/misiones";

import {
  AuthContext,
} from "./AuthContext";

import {
  useMisiones,
} from "../hooks/useMisiones";

export const MissionContext =
  createContext({
    progreso:
      progresoInicial,

    cargando: true,

    completarMision:
      async (
        _id: number
      ) => false,

    cargarProgreso:
      async () => {},
  });

type PropiedadesMisiones = {
  children: ReactNode;
};

export function MissionProvider({
  children,
}: PropiedadesMisiones) {
  const {
    uid,
    correoUsuario,
  } = useContext(
    AuthContext
  );

  const misiones =
    useMisiones(
      uid,
      correoUsuario
    );

  return (
    <MissionContext.Provider
      value={misiones}
    >
      {children}
    </MissionContext.Provider>
  );
}