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

function Register() {
  const [correo, setCorreo] =
    useState("");

  const [
    contrasena,
    setContrasena,
  ] = useState("");

  const [
    confirmar,
    setConfirmar,
  ] = useState("");

  const [
    mensaje,
    setMensaje,
  ] = useState("");

  const [
    mostrarError,
    setMostrarError,
  ] = useState(false);

  const { registrar } =
    useContext(AuthContext);

  const navigate =
    useNavigate();

  async function crearCuenta() {
    if (
      contrasena !== confirmar
    ) {
      setMensaje(
        "Las contraseñas no coinciden"
      );

      setMostrarError(true);

      return;
    }

    if (
      contrasena.length < 6
    ) {
      setMensaje(
        "La contraseña debe tener mínimo 6 caracteres"
      );

      setMostrarError(true);

      return;
    }

    const correcto =
      await registrar(
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
      setMensaje(
        "No fue posible crear la cuenta"
      );

      setMostrarError(true);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Registro
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

        <IonItem>
          <IonInput
            type="password"
            label="Confirmar contraseña"
            labelPlacement="stacked"
            value={confirmar}
            onIonChange={(evento) =>
              setConfirmar(
                evento.detail.value ??
                  ""
              )
            }
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={crearCuenta}
        >
          Registrarse
        </IonButton>

        <IonButton
          expand="block"
          fill="clear"
          routerLink="/login"
        >
          Ya tengo cuenta
        </IonButton>

        <IonToast
          isOpen={mostrarError}
          message={mensaje}
          duration={2500}
          onDidDismiss={() =>
            setMostrarError(false)
          }
        />
      </IonContent>
    </IonPage>
  );
}

export default Register;