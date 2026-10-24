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
  useGeolocation,
} from "../hooks/useGeolocation";

function Geolocalizacion() {
  const {
    latitud,
    longitud,
    seguimientoId,
    mensaje,
    obtenerUbicacion,
    iniciarSeguimiento,
    detenerSeguimiento,
  } = useGeolocation();

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
            Geolocalización
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>{mensaje}</p>

        <p>
          Latitud: {latitud}
        </p>

        <p>
          Longitud: {longitud}
        </p>

        <IonButton
          expand="block"
          onClick={obtenerUbicacion}
        >
          Obtener ubicación
        </IonButton>

        <IonButton
          expand="block"
          onClick={iniciarSeguimiento}
          disabled={
            seguimientoId !== ""
          }
        >
          Iniciar seguimiento
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          onClick={detenerSeguimiento}
          disabled={
            seguimientoId === ""
          }
        >
          Detener seguimiento
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Geolocalizacion;