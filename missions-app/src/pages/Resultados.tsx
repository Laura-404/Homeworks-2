import {
  IonButton,
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

function Resultados() {
  const {
    progreso,
  } = useContext(
    MissionContext
  );

  const completadas =
    progreso.missions.filter(
      (mision) =>
        mision.completed
    ).length;

  const total =
    progreso.missions.length;

  const estadoGeneral =
    completadas === total
      ? "Todas las misiones completadas"
      : "Misiones en progreso";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Resultados
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          Puntos totales
        </h2>

        <h1>
          {progreso.points}
        </h1>

        <h2>
          Misiones completadas
        </h2>

        <p>
          {completadas}
          {" / "}
          {total}
        </p>

        <h2>
          Estado general
        </h2>

        <p>
          {estadoGeneral}
        </p>

        <IonButton
          expand="block"
          routerLink="/home"
        >
          Volver a misiones
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          routerLink="/ranking"
        >
          Ver ranking
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Resultados;