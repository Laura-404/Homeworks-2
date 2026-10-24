import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
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
  TaskContext,
} from "../context/TaskContext";

import {
  AuthContext,
} from "../context/AuthContext";

import TareaItem
  from "../components/TareaItem";

import "./Tareas.css";

function ListaTareas() {
  const {
    tareas,
    completarTarea,
    eliminarTarea,
  } = useContext(
    TaskContext
  );

  const {
    correoUsuario,
    logout,
  } = useContext(
    AuthContext
  );

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
            Mis tareas
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>
          Usuario:
          {" "}
          {correoUsuario}
        </p>

        <IonButton
          expand="block"
          routerLink="/tasks/add"
        >
          Agregar tarea
        </IonButton>

        {tareas.length === 0 ? (
          <p className="mensaje-vacio">
            No hay tareas.
          </p>
        ) : (
          <IonList>
            {tareas.map(
              (tarea) => (
                <TareaItem
                  key={tarea.id}
                  tarea={tarea}
                  completarTarea={
                    completarTarea
                  }
                  eliminarTarea={
                    eliminarTarea
                  }
                />
              )
            )}
          </IonList>
        )}

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

export default ListaTareas;