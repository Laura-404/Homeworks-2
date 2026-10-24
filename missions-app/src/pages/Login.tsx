import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
} from "@ionic/react";

import {
  useContext,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  AuthContext,
} from "../context/AuthContext";

function Login() {
  const [correo, setCorreo] =
    useState("");

  const [
    contrasena,
    setContrasena,
  ] = useState("");

  const [
    mostrarError,
    setMostrarError,
  ] = useState(false);

  const { login } =
    useContext(
      AuthContext
    );

  const navigate =
    useNavigate();

  async function ingresar() {
    const correcto =
      await login(
        correo,
        contrasena
      );

    if (correcto) {
      navigate(
        "/home",
        {
          replace: true,
        }
      );
    } else {
      setMostrarError(true);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Missions App
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>
          Iniciar sesión
        </h2>

        <IonItem>
          <IonInput
            type="email"
            label="Correo"
            labelPlacement="stacked"
            value={correo}
            onIonChange={(evento) =>
              setCorreo(
                evento.detail
                  .value ?? ""
              )
            }
          />
        </IonItem>

        <IonItem>
          <IonInput
            type="password"
            label="Contraseña"
            labelPlacement="stacked"
            value={contrasena}
            onIonChange={(evento) =>
              setContrasena(
                evento.detail
                  .value ?? ""
              )
            }
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={ingresar}
        >
          Ingresar
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          routerLink="/register"
        >
          Crear cuenta
        </IonButton>

        <IonToast
          isOpen={mostrarError}
          message="Correo o contraseña incorrectos"
          duration={2000}
          onDidDismiss={() =>
            setMostrarError(
              false
            )
          }
        />
      </IonContent>
    </IonPage>
  );
}

export default Login;