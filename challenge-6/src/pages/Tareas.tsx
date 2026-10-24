import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  useState,
} from "react";

import {
  useTareasRealtime,
} from "../hooks/useTareasRealtime";

import {
  useNetwork,
} from "../hooks/useNetwork";

function Tareas() {
  const {
    tareas,
    error,
    add,
    update,
    deleteItem,
  } = useTareasRealtime();

  const {
    isOnline,
  } = useNetwork();

  const [titulo, setTitulo] =
    useState("");

  async function agregar() {
    if (
      titulo.trim() === ""
    ) {
      return;
    }

    await add(titulo);

    setTitulo("");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/home"
            />
          </IonButtons>

          <IonTitle>
            Tareas
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!isOnline && (
          <IonNote color="danger">
            Sin conexión. Las acciones
            de tareas están
            deshabilitadas.
          </IonNote>
        )}

        <IonItem>
          <IonInput
            label="Nueva tarea"
            labelPlacement="stacked"
            value={titulo}
            onIonChange={(evento) =>
              setTitulo(
                evento.detail.value ??
                  ""
              )
            }
          />
        </IonItem>

        <IonButton
          expand="block"
          disabled={!isOnline}
          onClick={agregar}
        >
          Agregar tarea
        </IonButton>

        {error !== "" && (
          <IonNote color="danger">
            {error}
          </IonNote>
        )}

        <IonList>
          {tareas.map(
            (tarea) => (
              <IonItem
                key={tarea.id}
              >
                <IonLabel>
                  <h2>
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
                  color="success"
                  disabled={!isOnline}
                  onClick={() =>
                    update(
                      tarea.id,
                      tarea.titulo,
                      !tarea.completada,
                      tarea.createdAt
                    )
                  }
                >
                  {tarea.completada
                    ? "Desmarcar"
                    : "Completar"}
                </IonButton>

                <IonButton
                  fill="clear"
                  color="danger"
                  disabled={!isOnline}
                  onClick={() =>
                    deleteItem(
                      tarea.id
                    )
                  }
                >
                  Eliminar
                </IonButton>
              </IonItem>
            )
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Tareas;