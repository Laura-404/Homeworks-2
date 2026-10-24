import {
  useEffect,
  useState,
} from "react";

import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

import {
  firestoreDb,
} from "../firebase/config";

import {
  misionesInfo,
  progresoInicial,
} from "../data/misiones";

import type {
  Progreso,
} from "../types/Mision";

export function useMisiones(
  uid: string,
  correo: string
) {
  const [
    progreso,
    setProgreso,
  ] = useState(
    progresoInicial
  );

  const [cargando, setCargando] =
    useState(true);

  useEffect(() => {
    if (uid === "") {
      setProgreso(
        progresoInicial
      );

      setCargando(false);

      return;
    }

    cargarProgreso();
  }, [uid]);

  async function cargarProgreso() {
    setCargando(true);

    const clave =
      `progreso_${uid}`;

    const guardado =
      localStorage.getItem(
        clave
      );

    if (guardado) {
      try {
        const progresoLocal:
          Progreso =
          JSON.parse(guardado);

        setProgreso(
          progresoLocal
        );
      } catch (error) {
        console.error(error);
      }
    }

    try {
      const documento =
        await getDoc(
          doc(
            firestoreDb,
            "usuarios",
            uid
          )
        );

      if (documento.exists()) {
        const datos =
          documento.data();

        const progresoFirebase:
          Progreso = {
          points:
            datos.points ?? 0,

          missions:
            datos.missions ??
            progresoInicial.missions,
        };

        setProgreso(
          progresoFirebase
        );

        localStorage.setItem(
          clave,
          JSON.stringify(
            progresoFirebase
          )
        );
      } else {
        await guardarFirebase(
          progresoInicial
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCargando(false);
    }
  }

  async function completarMision(
    id: number
  ) {
    if (uid === "") {
      return false;
    }

    const misionActual =
      progreso.missions.find(
        (mision) =>
          mision.id === id
      );

    if (
      !misionActual ||
      misionActual.completed
    ) {
      return false;
    }

    const informacion =
      misionesInfo.find(
        (mision) =>
          mision.id === id
      );

    if (!informacion) {
      return false;
    }

    const nuevasMisiones =
      progreso.missions.map(
        (mision) => {
          if (mision.id === id) {
            return {
              ...mision,
              completed: true,
            };
          }

          return mision;
        }
      );

    const nuevoProgreso:
      Progreso = {
      points:
        progreso.points +
        informacion.puntos,

      missions:
        nuevasMisiones,
    };

    setProgreso(
      nuevoProgreso
    );

    localStorage.setItem(
      `progreso_${uid}`,
      JSON.stringify(
        nuevoProgreso
      )
    );

    try {
      await guardarFirebase(
        nuevoProgreso
      );
    } catch (error) {
      console.error(error);
    }

    return true;
  }

  async function guardarFirebase(
    nuevoProgreso: Progreso
  ) {
    await setDoc(
      doc(
        firestoreDb,
        "usuarios",
        uid
      ),
      {
        email: correo,

        points:
          nuevoProgreso.points,

        missions:
          nuevoProgreso.missions,

        updatedAt:
          new Date().toISOString(),
      },
      {
        merge: true,
      }
    );
  }

  return {
    progreso,
    cargando,
    completarMision,
    cargarProgreso,
  };
}