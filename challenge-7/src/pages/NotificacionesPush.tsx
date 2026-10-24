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
  usePushNotifications,
} from "../hooks/usePushNotifications";

function NotificacionesPush() {
  const {
    token,
    mensaje,
    activarPush,
  } = usePushNotifications();

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
            Push Notifications
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>{mensaje}</p>

        <IonButton
          expand="block"
          onClick={activarPush}
        >
          Activar Push
        </IonButton>

        {token !== "" && (
          <>
            <h3>
              Token del dispositivo
            </h3>

            <p
              style={{
                wordBreak:
                  "break-all",
              }}
            >
              {token}
            </p>
          </>
        )}
      </IonContent>
    </IonPage>
  );
}

export default NotificacionesPush;