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
  useDevice,
} from "../hooks/useDevice";

function Dispositivo() {
  const {
    modelo,
    plataforma,
    sistemaOperativo,
    version,
    fabricante,
    bateria,
    cargandoBateria,
    obtenerInfo,
  } = useDevice();

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
            Dispositivo
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonButton
          expand="block"
          onClick={obtenerInfo}
        >
          Obtener información
        </IonButton>

        <p>
          Modelo: {modelo}
        </p>

        <p>
          Fabricante: {fabricante}
        </p>

        <p>
          Plataforma: {plataforma}
        </p>

        <p>
          Sistema:
          {" "}
          {sistemaOperativo}
        </p>

        <p>
          Versión: {version}
        </p>

        <p>
          Batería: {bateria}%
        </p>

        <p>
          Cargando:
          {" "}
          {cargandoBateria
            ? "Sí"
            : "No"}
        </p>
      </IonContent>
    </IonPage>
  );
}

export default Dispositivo;