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
  MissionContext,
} from "../context/MissionContext";

import {
  useGeolocationMision,
} from "../hooks/useGeolocationMision";

import {
  useNotificaciones,
} from "../hooks/useNotificaciones";

function MisionMovimiento() {
  const {
    progreso,
    completarMision,
  } = useContext(
    MissionContext
  );

  const {
    distancia,
    distanciaObjetivo,
    activo,
    mensaje,
    iniciarRecorrido,
    detenerRecorrido,
  } =
    useGeolocationMision();

  const {
    notificarMision,
  } = useNotificaciones();

  const completada =
    progreso.missions.find(
      (mision) =>
        mision.id === 2
    )?.completed ?? false;

  async function iniciar() {
    await iniciarRecorrido(
      async () => {
        const faltantesAntes =
          progreso.missions
            .filter(
              (mision) =>
                !mision.completed
            ).length;

        const nueva =
          await completarMision(
            2
          );

        if (nueva) {
          await notificarMision(
            faltantesAntes - 1
          );
        }
      }
    );
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
            Movimiento
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          Misión 2
        </h2>

        <p>
          Aléjate {distanciaObjetivo} metros
          desde tu posición inicial.
        </p>

        <p>
          Recompensa: 40 puntos
        </p>

        <h3>
          Distancia:
          {" "}
          {distancia.toFixed(1)}
          {" "}
          metros
        </h3>

        <p>{mensaje}</p>

        <IonButton
          expand="block"
          disabled={
            activo ||
            completada
          }
          onClick={iniciar}
        >
          {completada
            ? "Misión completada"
            : "Iniciar recorrido"}
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          disabled={!activo}
          onClick={
            detenerRecorrido
          }
        >
          Detener
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default MisionMovimiento;