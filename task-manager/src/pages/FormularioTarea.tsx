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
  IonToast,
  IonToolbar,
} from "@ionic/react";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  TaskContext,
} from "../context/TaskContext";

function FormularioTarea() {
  const parametros =
    useParams();

  const navigate =
    useNavigate();

  const {
    tareas,
    agregarTarea,
    editarTarea,
  } = useContext(
    TaskContext
  );

  const id =
    parametros.id
      ? Number(parametros.id)
      : 0;

  const editando =
    id !== 0;

  const [titulo, setTitulo] =
    useState("");

  const [
    mostrarError,
    setMostrarError,
  ] = useState(false);

  useEffect(() => {
    if (editando) {
      const tarea =
        tareas.find(
          (item) =>
            item.id === id
        );

      if (tarea) {
        setTitulo(
          tarea.titulo
        );
      }
    } else {
      setTitulo("");
    }
  }, [
    id,
    editando,
    tareas,
  ]);

  function guardarTarea() {
    if (
      titulo.trim() === ""
    ) {
      setMostrarError(true);

      return;
    }

    if (editando) {
      editarTarea(
        id,
        titulo
      );
    } else {
      agregarTarea(
        titulo
      );
    }

    navigate(
      "/tasks",
      {
        replace: true,
      }
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              defaultHref="/tasks"
            />
          </IonButtons>

          <IonTitle>
            {editando
              ? "Editar tarea"
              : "Nueva tarea"}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonItem>
          <IonInput
            label="Título"
            labelPlacement="stacked"
            value={titulo}
            onIonChange={(evento) =>
              setTitulo(
                evento.detail.value ??
                  ""
              )
            }
          />
        </IonItem>

        <IonButton
          expand="block"
          onClick={guardarTarea}
        >
          {editando
            ? "Guardar cambios"
            : "Agregar tarea"}
        </IonButton>

        <IonToast
          isOpen={mostrarError}
          message="El título es obligatorio"
          duration={2000}
          onDidDismiss={() =>
            setMostrarError(false)
          }
        />
      </IonContent>
    </IonPage>
  );
}

export default FormularioTarea;