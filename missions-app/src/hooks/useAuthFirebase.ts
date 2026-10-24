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
  doc,
  setDoc,
} from "firebase/firestore";

import {
  auth,
  firestoreDb,
} from "../firebase/config";

import {
  progresoInicial,
} from "../data/misiones";

export function useAuthFirebase() {
  const [logueado, setLogueado] =
    useState(false);

  const [uid, setUid] =
    useState("");

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
            setUid(usuario.uid);

            setCorreoUsuario(
              usuario.email ?? ""
            );
          } else {
            setLogueado(false);
            setUid("");
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
      const resultado =
        await createUserWithEmailAndPassword(
          auth,
          correo,
          contrasena
        );

      const nuevoUsuario = {
        email: correo,
        points:
          progresoInicial.points,

        missions:
          progresoInicial.missions,

        updatedAt:
          new Date().toISOString(),
      };

      await setDoc(
        doc(
          firestoreDb,
          "usuarios",
          resultado.user.uid
        ),
        nuevoUsuario
      );

      localStorage.setItem(
        `progreso_${resultado.user.uid}`,
        JSON.stringify({
          points:
            progresoInicial.points,

          missions:
            progresoInicial.missions,
        })
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
    uid,
    correoUsuario,
    cargando,
    login,
    registrar,
    logout,
  };
}