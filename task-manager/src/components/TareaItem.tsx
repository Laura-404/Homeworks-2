import {
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";

import type {
  Tarea,
} from "../types/Tarea";

type PropiedadesTarea = {
  tarea: Tarea;

  completarTarea: (
    id: number
  ) => void;

  eliminarTarea: (
    id: number
  ) => void;
};

function TareaItem({
  tarea,
  completarTarea,
  eliminarTarea,
}: PropiedadesTarea) {
  return (
    <IonItem>
      <IonLabel>
        <h2
          className={
            tarea.completada
              ? "tarea-completada"
              : ""
          }
        >
          {tarea.titulo}
        </h2>

        <p>
          {tarea.completada
            ? "Completada"
            : "Pendiente"}
        </p>
      </IonLabel>

      <IonButton
        fill="clear"
        routerLink={
          `/tasks/${tarea.id}`
        }
      >
        Detalle
      </IonButton>

      <IonButton
        fill="clear"
        routerLink={
          `/tasks/edit/${tarea.id}`
        }
      >
        Editar
      </IonButton>

      <IonButton
        fill="outline"
        color="success"
        onClick={() =>
          completarTarea(
            tarea.id
          )
        }
      >
        {tarea.completada
          ? "Desmarcar"
          : "Completar"}
      </IonButton>

      <IonButton
        color="danger"
        onClick={() =>
          eliminarTarea(
            tarea.id
          )
        }
      >
        Eliminar
      </IonButton>
    </IonItem>
  );
}

export default TareaItem;