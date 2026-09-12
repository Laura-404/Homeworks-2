import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Lista() {
  const navigate = useNavigate();

  const elementos = [
    "Elemento 1",
    "Elemento 2",
    "Elemento 3",
  ];

  useEffect(() => {
    const logged =
      localStorage.getItem("logged");

    if (logged !== "true") {
      navigate("/login", {
        replace: true,
      });
    }
  }, [navigate]);

  function cerrarSesion() {
    localStorage.removeItem("logged");

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {elementos.map(
            (elemento, indice) => (
              <IonItem key={indice}>
                {elemento}
              </IonItem>
            )
          )}
        </IonList>

        <IonButton
          expand="block"
          color="danger"
          onClick={cerrarSesion}
        >
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Lista;