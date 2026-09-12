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
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

const CLAVE_LOGIN =
  "mediclinic_ionic_logged";

function Login() {
  const [correo, setCorreo] =
    useState("");

  const [contrasena, setContrasena] =
    useState("");

  const [
    mostrarError,
    setMostrarError,
  ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const logged =
      localStorage.getItem(
        CLAVE_LOGIN
      );

    if (logged === "true") {
      navigate(
        "/tabs/visitas",
        {
          replace: true,
        }
      );
    }
  }, [navigate]);

  function iniciarSesion() {
    if (
      correo ===
        "medico@mediclinic.com" &&
      contrasena === "123"
    ) {
      localStorage.setItem(
        CLAVE_LOGIN,
        "true"
      );

      navigate(
        "/tabs/visitas",
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
            MediClinic
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
            onIonInput={(evento) =>
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
            onIonInput={(evento) =>
              setContrasena(
                evento.detail.value ??
                  ""
              )
            }
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={iniciarSesion}
        >
          Iniciar sesión
        </IonButton>

        <IonToast
          isOpen={mostrarError}
          message="Correo o contraseña incorrectos"
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