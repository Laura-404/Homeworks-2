import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

function Home() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Challenge 7
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          Sensores y funciones
        </h2>

        <IonButton
          expand="block"
          routerLink="/geolocation"
        >
          Geolocalización
        </IonButton>

        <IonButton
          expand="block"
          routerLink="/camera"
        >
          Cámara
        </IonButton>

        <IonButton
          expand="block"
          routerLink="/motion"
        >
          Movimiento
        </IonButton>

        <IonButton
          expand="block"
          routerLink="/device"
        >
          Dispositivo
        </IonButton>

        <IonButton
          expand="block"
          routerLink="/haptics"
        >
          Haptics
        </IonButton>

        <IonButton
          expand="block"
          routerLink="/filesystem"
        >
          Sistema de archivos
        </IonButton>

        <IonButton
          expand="block"
          routerLink="/local-notifications"
        >
          Notificaciones locales
        </IonButton>

        <IonButton
          expand="block"
          routerLink="/push-notifications"
        >
          Push Notifications
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Home;