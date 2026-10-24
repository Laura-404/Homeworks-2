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
  useHaptics,
} from "../hooks/useHaptics";

function Haptica() {
  const {
    mensaje,
    vibrar,
  } = useHaptics();

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
            Haptics
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>{mensaje}</p>

        <IonButton
          expand="block"
          onClick={vibrar}
        >
          Vibrar
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Haptica;