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
  useCamera,
} from "../hooks/useCamera";

function Camara() {
  const {
    imagen,
    mensaje,
    obtenerFoto,
  } = useCamera();

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
            Cámara
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>{mensaje}</p>

        <IonButton
          expand="block"
          onClick={obtenerFoto}
        >
          Tomar o seleccionar foto
        </IonButton>

        {imagen !== "" && (
          <img
            src={imagen}
            alt="Imagen seleccionada"
            style={{
              width: "100%",
              maxWidth: "350px",
              marginTop: "20px",
            }}
          />
        )}
      </IonContent>
    </IonPage>
  );
}

export default Camara;