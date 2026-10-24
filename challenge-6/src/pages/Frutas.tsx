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
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import {
  useState,
} from "react";

import {
  useFrutasDexie,
} from "../hooks/useFrutasDexie";

import type {
  Fruta,
} from "../types/Fruta";

function Frutas() {
  const {
    frutas,
    add,
    update,
    deleteItem,
    newFunction,
  } = useFrutasDexie();

  const [nombre, setNombre] =
    useState("");

  const [
    cantidad,
    setCantidad,
  ] = useState("");

  const [
    editandoId,
    setEditandoId,
  ] = useState(0);

  async function guardar() {
    if (
      nombre.trim() === "" ||
      cantidad.trim() === ""
    ) {
      return;
    }

    const cantidadNumero =
      Number(cantidad);

    if (editandoId !== 0) {
      await update(
        editandoId,
        nombre,
        cantidadNumero
      );
    } else {
      await add(
        nombre,
        cantidadNumero
      );
    }

    limpiar();
  }

  function editar(
    fruta: Fruta
  ) {
    setEditandoId(
      fruta.id
    );

    setNombre(
      fruta.nombre
    );

    setCantidad(
      String(fruta.cantidad)
    );
  }

  function limpiar() {
    setEditandoId(0);
    setNombre("");
    setCantidad("");
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
            Frutas
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonNote color="success">
          Dexie funciona localmente,
          incluso sin conexión.
        </IonNote>

        <p>
          Total de frutas:
          {" "}
          {newFunction()}
        </p>

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
            type="number"
            label="Cantidad"
            labelPlacement="stacked"
            value={cantidad}
            onIonChange={(evento) =>
              setCantidad(
                evento.detail.value ??
                  ""
              )
            }
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={guardar}
        >
          {editandoId !== 0
            ? "Guardar cambios"
            : "Agregar fruta"}
        </IonButton>

        {editandoId !== 0 && (
          <IonButton
            expand="block"
            fill="outline"
            onClick={limpiar}
          >
            Cancelar
          </IonButton>
        )}

        <IonList>
          {frutas.map(
            (fruta) => (
              <IonItem
                key={fruta.id}
              >
                <IonLabel>
                  <h2>
                    {fruta.nombre}
                  </h2>

                  <p>
                    Cantidad:
                    {" "}
                    {fruta.cantidad}
                  </p>
                </IonLabel>

                <IonButton
                  fill="clear"
                  onClick={() =>
                    editar(fruta)
                  }
                >
                  Editar
                </IonButton>

                <IonButton
                  fill="clear"
                  color="danger"
                  onClick={() =>
                    deleteItem(
                      fruta.id
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

export default Frutas;