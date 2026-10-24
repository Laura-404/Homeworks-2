import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToast,
  IonToolbar,
  IonHeader,
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
    useContext(AuthContext);

  const navigate =
    useNavigate();

  async function ingresar() {
    if (
      correo.trim() === "" ||
      contrasena.trim() === ""
    ) {
      setMostrarError(true);

      return;
    }

    const acceso =
      await login(
        correo,
        contrasena
      );

    if (acceso) {
      navigate(
        "/tasks",
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
            Login
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            type="email"
            label="Correo"
            labelPlacement="stacked"
            value={correo}
            onIonChange={(evento) =>
              setCorreo(
                evento.detail.value ??
                  ""
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
                evento.detail.value ??
                  ""
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
          message="No fue posible iniciar sesión"
          duration={2000}
          onDidDismiss={() =>
            setMostrarError(false)
          }
        />
      </IonContent>
    </IonPage>
  );
}

export default Login;