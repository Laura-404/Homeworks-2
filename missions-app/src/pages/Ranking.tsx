import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  useContext,
  useEffect,
} from "react";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  useRanking,
} from "../hooks/useRanking";

function Ranking() {
  const {
    uid,
  } = useContext(
    AuthContext
  );

  const {
    usuarios,
    cargando,
    cargarRanking,
  } = useRanking();

  useEffect(() => {
    cargarRanking();
  }, []);

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
            Ranking
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          Top 5
        </h2>

        <IonButton
          expand="block"
          fill="outline"
          onClick={
            cargarRanking
          }
        >
          Actualizar ranking
        </IonButton>

        {cargando && (
          <IonSpinner />
        )}

        <IonList>
          {usuarios.map(
            (
              usuario,
              indice
            ) => (
              <IonItem
                key={usuario.uid}
              >
                <IonLabel>
                  <h2>
                    {indice + 1}.
                    {" "}
                    {usuario.uid ===
                    uid
                      ? "Tú"
                      : usuario.email}
                  </h2>

                  <p>
                    {
                      usuario.points
                    }
                    {" "}
                    puntos
                  </p>
                </IonLabel>
              </IonItem>
            )
          )}
        </IonList>

        {usuarios.length < 5 && (
          <p>
            Registra más usuarios
            para completar el Top 5.
          </p>
        )}
      </IonContent>
    </IonPage>
  );
}

export default Ranking;