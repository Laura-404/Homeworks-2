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
  usePermanencia,
} from "../hooks/usePermanencia";

import {
  useNotificaciones,
} from "../hooks/useNotificaciones";

function MisionPermanencia() {
  const {
    progreso,
    completarMision,
  } = useContext(
    MissionContext
  );

  const {
    segundosQuieto,
    activo,
    mensaje,
    iniciarPermanencia,
    detener,
  } = usePermanencia();

  const {
    notificarMision,
  } = useNotificaciones();

  const movimientoCompletado =
    progreso.missions.find(
      (mision) =>
        mision.id === 2
    )?.completed ?? false;

  const completada =
    progreso.missions.find(
      (mision) =>
        mision.id === 3
    )?.completed ?? false;

  async function iniciar() {
    await iniciarPermanencia(
      async () => {
        const faltantesAntes =
          progreso.missions
            .filter(
              (mision) =>
                !mision.completed
            ).length;

        const nueva =
          await completarMision(
            3
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
            Permanencia
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          Misión 3
        </h2>

        {!movimientoCompletado && (
          <p>
            Primero debes completar
            la misión de movimiento.
          </p>
        )}

        {movimientoCompletado && (
          <>
            <p>
              Mantente quieto
              durante 10 segundos.
            </p>

            <p>
              Recompensa:
              {" "}
              40 puntos
            </p>

            <h2>
              {segundosQuieto}
              {" / "}
              10 segundos
            </h2>

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
                : "Comenzar"}
            </IonButton>

            <IonButton
              expand="block"
              color="danger"
              disabled={!activo}
              onClick={detener}
            >
              Detener
            </IonButton>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default MisionPermanencia;