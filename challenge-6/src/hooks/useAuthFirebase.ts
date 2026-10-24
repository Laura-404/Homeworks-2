import {
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  auth,
} from "../firebase/config";

export function useAuthFirebase() {
  const [logueado, setLogueado] =
    useState(false);

  const [
    correoUsuario,
    setCorreoUsuario,
  ] = useState("");

  const [cargando, setCargando] =
    useState(true);

  useEffect(() => {
    const cancelar =
      onAuthStateChanged(
        auth,
        (usuario) => {
          if (usuario) {
            setLogueado(true);

            setCorreoUsuario(
              usuario.email ?? ""
            );
          } else {
            setLogueado(false);
            setCorreoUsuario("");
          }

          setCargando(false);
        }
      );

    return cancelar;
  }, []);

  async function login(
    correo: string,
    contrasena: string
  ) {
    try {
      await signInWithEmailAndPassword(
        auth,
        correo,
        contrasena
      );

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  async function registrar(
    correo: string,
    contrasena: string
  ) {
    try {
      await createUserWithEmailAndPassword(
        auth,
        correo,
        contrasena
      );

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    logueado,
    correoUsuario,
    cargando,
    login,
    registrar,
    logout,
  };
}