import { useState } from "react";

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import FormularioTarea from "../components/FormularioTarea";
import ListaTareas from "../components/ListaTareas";

import type { Tarea } from "../types/Tarea";

import "./Home.css";

const tareasIniciales: Tarea[] = [
  {
    id: 1,
    titulo: "Repasar React",
    completada: false,
  },
  {
    id: 2,
    titulo: "Aprender Ionic",
    completada: false,
  },
];

function Home() {
  const [tareas, setTareas] =
    useState(tareasIniciales);

  function agregarTarea(titulo: string) {
    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo: titulo,
      completada: false,
    };

    setTareas((tareasAnteriores) => [
      ...tareasAnteriores,
      nuevaTarea,
    ]);
  }

  function completarTarea(id: number) {
    setTareas((tareasAnteriores) =>
      tareasAnteriores.map((tarea) => {
        if (tarea.id === id) {
          return {
            ...tarea,
            completada: !tarea.completada,
          };
        }

        return tarea;
      })
    );
  }

  function eliminarTarea(id: number) {
    setTareas((tareasAnteriores) =>
      tareasAnteriores.filter(
        (tarea) => tarea.id !== id
      )
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Task Manager
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <FormularioTarea
          agregarTarea={agregarTarea}
        />

        <ListaTareas
          tareas={tareas}
          completarTarea={completarTarea}
          eliminarTarea={eliminarTarea}
        />
      </IonContent>
    </IonPage>
  );
}

export default Home;