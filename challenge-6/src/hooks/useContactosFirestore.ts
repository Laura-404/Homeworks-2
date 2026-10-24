import {
  useState,
} from "react";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import {
  firestoreDb,
} from "../firebase/config";

import type {
  Contacto,
} from "../types/Contacto";

const contactosVacios: Contacto[] =
  [];

export function useContactosFirestore() {
  const [
    contactos,
    setContactos,
  ] = useState(
    contactosVacios
  );

  const [cargando, setCargando] =
    useState(false);

  const [error, setError] =
    useState("");

  async function getAll() {
    try {
      setCargando(true);
      setError("");

      const consulta =
        await getDocs(
          collection(
            firestoreDb,
            "contacts"
          )
        );

      const lista: Contacto[] =
        consulta.docs.map(
          (documento) => {
            const datos =
              documento.data();

            return {
              id: documento.id,

              nombre:
                datos.nombre ?? "",

              telefono:
                datos.telefono ??
                "",
            };
          }
        );

      setContactos(lista);
    } catch (error) {
      console.error(error);

      setError(
        "No fue posible cargar los contactos"
      );
    } finally {
      setCargando(false);
    }
  }

  async function add(
    nombre: string,
    telefono: string
  ) {
    try {
      await addDoc(
        collection(
          firestoreDb,
          "contacts"
        ),
        {
          nombre: nombre,
          telefono: telefono,
          createdAt:
            new Date().toISOString(),
        }
      );

      await getAll();
    } catch (error) {
      console.error(error);

      setError(
        "No fue posible agregar el contacto"
      );
    }
  }

  async function update(
    id: string,
    nombre: string,
    telefono: string
  ) {
    try {
      await updateDoc(
        doc(
          firestoreDb,
          "contacts",
          id
        ),
        {
          nombre: nombre,
          telefono: telefono,
        }
      );

      await getAll();
    } catch (error) {
      console.error(error);

      setError(
        "No fue posible actualizar el contacto"
      );
    }
  }

  async function removeItem(
    id: string
  ) {
    try {
      await deleteDoc(
        doc(
          firestoreDb,
          "contacts",
          id
        )
      );

      await getAll();
    } catch (error) {
      console.error(error);

      setError(
        "No fue posible eliminar el contacto"
      );
    }
  }

  return {
    contactos,
    cargando,
    error,
    getAll,
    add,
    update,
    removeItem,
  };
}