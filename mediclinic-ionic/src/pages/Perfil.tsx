import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useNavigate } from "react-router-dom";

const CLAVE_LOGIN =
  "mediclinic_ionic_logged";

function Perfil() {
  const navigate = useNavigate();

  function cerrarSesion() {
    localStorage.removeItem(
      CLAVE_LOGIN
    );

    navigate(
      "/login",
      {
        replace: true,
      }
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Perfil
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          Médico MediClinic
        </h2>

        <p>
          Correo:
          medico@mediclinic.com
        </p>

        <IonButton
          expand="block"
          color="danger"
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Perfil;