import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  useContext,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  TaskContext,
} from "../context/TaskContext";

function DetalleTarea() {
  const parametros =
    useParams();

  const {
    tareas,
    completarTarea,
  } = useContext(
    TaskContext
  );

  const id =
    Number(parametros.id);

  const tarea =
    tareas.find(
      (item) =>
        item.id === id
    );

  if (!tarea) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>
            Tarea no encontrada.
          </p>

          <IonButton
            routerLink="/tasks"
          >
            Volver
          </IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/tasks"
            />
          </IonButtons>

          <IonTitle>
            Detalle
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          {tarea.titulo}
        </h2>

        <p>
          Estado:
          {" "}
          {tarea.completada
            ? "Completada"
            : "Pendiente"}
        </p>

        <IonButton
          expand="block"
          onClick={() =>
            completarTarea(
              tarea.id
            )
          }
        >
          {tarea.completada
            ? "Marcar pendiente"
            : "Marcar completada"}
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          routerLink={
            `/tasks/edit/${tarea.id}`
          }
        >
          Editar tarea
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default DetalleTarea;