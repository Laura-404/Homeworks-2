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
  useAccelerometer,
} from "../hooks/useAccelerometer";

function Movimiento() {
  const {
    x,
    y,
    z,
    alpha,
    beta,
    gamma,
    escuchando,
    iniciar,
    detener,
  } = useAccelerometer();

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
            Movimiento
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Aceleración</h2>

        <p>
          X: {x.toFixed(2)}
        </p>

        <p>
          Y: {y.toFixed(2)}
        </p>

        <p>
          Z: {z.toFixed(2)}
        </p>

        <h2>Orientación</h2>

        <p>
          Alpha:
          {" "}
          {alpha.toFixed(2)}
        </p>

        <p>
          Beta:
          {" "}
          {beta.toFixed(2)}
        </p>

        <p>
          Gamma:
          {" "}
          {gamma.toFixed(2)}
        </p>

        <IonButton
          expand="block"
          onClick={iniciar}
          disabled={escuchando}
        >
          Iniciar sensor
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          onClick={detener}
          disabled={!escuchando}
        >
          Detener sensor
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Movimiento;