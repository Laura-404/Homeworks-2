import {
  IonButton,
  IonContent,
  IonHeader,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  useContext,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

import {
  useNetwork,
} from "../hooks/useNetwork";

function Home() {
  const {
    correoUsuario,
    logout,
  } = useContext(
    AuthContext
  );

  const {
    isOnline,
    connectionType,
  } = useNetwork();

  const navigate =
    useNavigate();

  async function cerrarSesion() {
    await logout();

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
            Challenge 6
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          Bienvenido
        </h2>

        <p>
          {correoUsuario}
        </p>

        <IonNote
          color={
            isOnline
              ? "success"
              : "danger"
          }
        >
          {isOnline
            ? `Conectado - ${connectionType}`
            : "Sin conexión"}
        </IonNote>

        <IonButton
          expand="block"
          routerLink="/contacts"
        >
          Contactos
        </IonButton>

        <IonButton
          expand="block"
          routerLink="/tasks"
        >
          Tareas
        </IonButton>

        <IonButton
          expand="block"
          routerLink="/fruits"
        >
          Frutas
        </IonButton>

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

export default Home;