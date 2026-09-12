import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useParams } from "react-router-dom";

import type { Visita } from "../types/Visita";

type PropiedadesDetalle = {
  visitas: Visita[];
  cambiarEstado: (
    id: number
  ) => void;
};

function DetalleVisita({
  visitas,
  cambiarEstado,
}: PropiedadesDetalle) {
  const parametros = useParams();

  const id = Number(
    parametros.id
  );

  const visita = visitas.find(
    (item) => item.id === id
  );

  if (!visita) {
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>
            Visita no encontrada.
          </p>

          <IonButton
            routerLink="/tabs/visitas"
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
          <IonTitle>
            Detalle de visita
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          {visita.paciente}
        </h2>

        <p>
          Hora: {visita.hora}
        </p>

        <p>
          Estado actual:{" "}
          {visita.estado}
        </p>

        <IonButton
          expand="block"
          disabled={
            visita.estado ===
            "finalizada"
          }
          onClick={() =>
            cambiarEstado(
              visita.id
            )
          }
        >
          {visita.estado ===
          "finalizada"
            ? "Visita finalizada"
            : "Cambiar estado"}
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          routerLink="/tabs/visitas"
          routerDirection="back"
        >
          Volver
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default DetalleVisita;