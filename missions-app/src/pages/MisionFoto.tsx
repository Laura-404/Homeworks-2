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
  useCamera,
} from "../hooks/useCamera";

import {
  useNotificaciones,
} from "../hooks/useNotificaciones";

function MisionFoto() {
  const {
    progreso,
    completarMision,
  } = useContext(
    MissionContext
  );

  const {
    imagen,
    mensaje,
    tomarFoto,
  } = useCamera();

  const {
    notificarMision,
  } = useNotificaciones();

  const completada =
    progreso.missions.find(
      (mision) =>
        mision.id === 1
    )?.completed ?? false;

  async function ejecutar() {
    const ruta =
      await tomarFoto();

    if (ruta === "") {
      return;
    }

    const faltantesAntes =
      progreso.missions.filter(
        (mision) =>
          !mision.completed
      ).length;

    const nueva =
      await completarMision(1);

    if (nueva) {
      await notificarMision(
        faltantesAntes - 1
      );
    }
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
            Evidencia
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          Misión 1
        </h2>

        <p>
          Toma una fotografía
          para completar la misión.
        </p>

        <p>
          Recompensa: 40 puntos
        </p>

        <IonButton
          expand="block"
          disabled={completada}
          onClick={ejecutar}
        >
          {completada
            ? "Misión completada"
            : "Tomar foto"}
        </IonButton>

        <p>{mensaje}</p>

        {imagen !== "" && (
          <img
            src={imagen}
            alt="Evidencia"
            style={{
              width: "100%",
              maxWidth: "400px",
              marginTop: "20px",
            }}
          />
        )}
      </IonContent>
    </IonPage>
  );
}

export default MisionFoto;