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
  useLocalNotifications,
} from "../hooks/useLocalNotifications";

function NotificacionesLocales() {
  const {
    mensaje,
    programar,
  } = useLocalNotifications();

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
            Notificaciones locales
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>{mensaje}</p>

        <IonButton
          expand="block"
          onClick={programar}
        >
          Programar notificación
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default NotificacionesLocales;