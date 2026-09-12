import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] =
    useState("");

  const [mensaje, setMensaje] =
    useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const logged =
      localStorage.getItem("logged");

    if (logged === "true") {
      navigate("/list", {
        replace: true,
      });
    }
  }, [navigate]);

  function iniciarSesion() {
    if (
      correo === "user@mail.com" &&
      contrasena === "123"
    ) {
      localStorage.setItem(
        "logged",
        "true"
      );

      navigate("/list", {
        replace: true,
      });
    } else {
      setMensaje(
        "Correo o contraseña incorrectos"
      );
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="login">
          <IonItem>
            <IonInput
              type="email"
              label="Email"
              labelPlacement="stacked"
              placeholder="user@mail.com"
              value={correo}
              onIonInput={(evento) =>
                setCorreo(
                  evento.detail.value ?? ""
                )
              }
            />
          </IonItem>

          <IonItem>
            <IonInput
              type="password"
              label="Password"
              labelPlacement="stacked"
              placeholder="Password"
              value={contrasena}
              onIonInput={(evento) =>
                setContrasena(
                  evento.detail.value ?? ""
                )
              }
            />
          </IonItem>

          <IonButton
            expand="block"
            onClick={iniciarSesion}
          >
            Login
          </IonButton>

          {mensaje !== "" && (
            <IonText color="danger">
              <p>{mensaje}</p>
            </IonText>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Login;