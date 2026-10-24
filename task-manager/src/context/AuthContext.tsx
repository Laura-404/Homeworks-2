import {
  createContext,
} from "react";

import type {
  ReactNode,
} from "react";

import {
  useAuthFirebase,
} from "../hooks/useAuthFirebase";

export const AuthContext =
  createContext({
    logueado: false,
    correoUsuario: "",
    cargando: true,

    login: async (
      _correo: string,
      _contrasena: string
    ) => false,

    registrar: async (
      _correo: string,
      _contrasena: string
    ) => false,

    logout: async () => {},
  });

type PropiedadesProveedor = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: PropiedadesProveedor) {
  const auth =
    useAuthFirebase();

  return (
    <AuthContext.Provider
      value={auth}
    >
      {children}
    </AuthContext.Provider>
  );
}