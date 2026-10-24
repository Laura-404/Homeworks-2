import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  useState,
} from "react";

import {
  useFilesystem,
} from "../hooks/useFilesystem";

function Archivos() {
  const [texto, setTexto] =
    useState("");

  const {
    contenidoLeido,
    mensaje,
    guardarArchivo,
    leerArchivo,
    eliminarArchivo,
  } = useFilesystem();

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
            Sistema de archivos
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Contenido"
            labelPlacement="stacked"
            value={texto}
            onIonChange={(evento) =>
              setTexto(
                evento.detail.value ??
                  ""
              )
            }
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={() =>
            guardarArchivo(texto)
          }
        >
          Guardar archivo
        </IonButton>

        <IonButton
          expand="block"
          onClick={leerArchivo}
        >
          Leer archivo
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          onClick={eliminarArchivo}
        >
          Eliminar archivo
        </IonButton>

        <p>{mensaje}</p>

        <h3>
          Contenido leído
        </h3>

        <p>
          {contenidoLeido}
        </p>
      </IonContent>
    </IonPage>
  );
}

export default Archivos;