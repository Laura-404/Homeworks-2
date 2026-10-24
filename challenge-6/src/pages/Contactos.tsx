import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  useEffect,
  useState,
} from "react";

import {
  useContactosFirestore,
} from "../hooks/useContactosFirestore";

import {
  useNetwork,
} from "../hooks/useNetwork";

import type {
  Contacto,
} from "../types/Contacto";

function Contactos() {
  const {
    contactos,
    cargando,
    error,
    getAll,
    add,
    update,
    removeItem,
  } = useContactosFirestore();

  const {
    isOnline,
  } = useNetwork();

  const [nombre, setNombre] =
    useState("");

  const [
    telefono,
    setTelefono,
  ] = useState("");

  const [
    editandoId,
    setEditandoId,
  ] = useState("");

  useEffect(() => {
    if (isOnline) {
      getAll();
    }
  }, [isOnline]);

  async function guardar() {
    if (
      nombre.trim() === "" ||
      telefono.trim() === ""
    ) {
      return;
    }

    if (editandoId !== "") {
      await update(
        editandoId,
        nombre,
        telefono
      );
    } else {
      await add(
        nombre,
        telefono
      );
    }

    limpiarFormulario();
  }

  function editar(
    contacto: Contacto
  ) {
    setEditandoId(
      contacto.id
    );

    setNombre(
      contacto.nombre
    );

    setTelefono(
      contacto.telefono
    );
  }

  function limpiarFormulario() {
    setEditandoId("");
    setNombre("");
    setTelefono("");
  }

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
            Contactos
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!isOnline && (
          <IonNote color="danger">
            Sin conexión. Las acciones
            de contactos están
            deshabilitadas.
          </IonNote>
        )}

        <IonItem>
          <IonInput
            label="Nombre"
            labelPlacement="stacked"
            value={nombre}
            onIonChange={(evento) =>
              setNombre(
                evento.detail.value ??
                  ""
              )
            }
          />
        </IonItem>

        <IonItem>
          <IonInput
            label="Teléfono"
            labelPlacement="stacked"
            value={telefono}
            onIonChange={(evento) =>
              setTelefono(
                evento.detail.value ??
                  ""
              )
            }
          />
        </IonItem>

        <IonButton
          expand="block"
          disabled={!isOnline}
          onClick={guardar}
        >
          {editandoId !== ""
            ? "Guardar cambios"
            : "Agregar contacto"}
        </IonButton>

        {editandoId !== "" && (
          <IonButton
            expand="block"
            fill="outline"
            onClick={
              limpiarFormulario
            }
          >
            Cancelar
          </IonButton>
        )}

        {cargando && (
          <IonSpinner />
        )}

        {error !== "" && (
          <IonNote color="danger">
            {error}
          </IonNote>
        )}

        <IonList>
          {contactos.map(
            (contacto) => (
              <IonItem
                key={contacto.id}
              >
                <IonLabel>
                  <h2>
                    {contacto.nombre}
                  </h2>

                  <p>
                    {
                      contacto.telefono
                    }
                  </p>
                </IonLabel>

                <IonButton
                  fill="clear"
                  disabled={!isOnline}
                  onClick={() =>
                    editar(contacto)
                  }
                >
                  Editar
                </IonButton>

                <IonButton
                  color="danger"
                  fill="clear"
                  disabled={!isOnline}
                  onClick={() =>
                    removeItem(
                      contacto.id
                    )
                  }
                >
                  Eliminar
                </IonButton>
              </IonItem>
            )
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Contactos;