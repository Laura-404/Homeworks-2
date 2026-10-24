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
  AuthContext,
} from "../context/AuthContext";

import {
  MissionContext,
} from "../context/MissionContext";

import {
  misionesInfo,
} from "../data/misiones";

import MisionItem
  from "../components/MisionItem";

import "./Misiones.css";

function Home() {
  const {
    correoUsuario,
    logout,
  } = useContext(
    AuthContext
  );

  const {
    progreso,
  } = useContext(
    MissionContext
  );

  const navigate =
    useNavigate();

  const completadas =
    progreso.missions.filter(
      (mision) =>
        mision.completed
    ).length;

  const total =
    progreso.missions.length;

  const porcentaje =
    total === 0
      ? 0
      : Math.round(
          completadas /
          total *
          100
        );

  const movimientoCompletado =
    progreso.missions.find(
      (mision) =>
        mision.id === 2
    )?.completed ?? false;

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
            Misiones
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <p>
          Usuario:
          {" "}
          {correoUsuario}
        </p>

        <h2>
          Puntos:
          {" "}
          {progreso.points}
        </h2>

        <p>
          Progreso:
          {" "}
          {porcentaje}%
        </p>

        <div className="barra">
          <div
            className="barra-relleno"
            style={{
              width:
                `${porcentaje}%`,
            }}
          />
        </div>

        <p>
          {completadas}
          {" / "}
          {total}
          {" "}
          misiones completadas
        </p>

        <IonList>
          {misionesInfo.map(
            (informacion) => {
              const estado =
                progreso.missions
                  .find(
                    (mision) =>
                      mision.id ===
                      informacion.id
                  );

              const habilitada =
                informacion.id !== 3 ||
                movimientoCompletado;

              return (
                <MisionItem
                  key={
                    informacion.id
                  }
                  nombre={
                    informacion.nombre
                  }
                  descripcion={
                    informacion
                      .descripcion
                  }
                  puntos={
                    informacion.puntos
                  }
                  ruta={
                    informacion.ruta
                  }
                  completed={
                    estado?.completed ??
                    false
                  }
                  habilitada={
                    habilitada
                  }
                />
              );
            }
          )}
        </IonList>

        <IonButton
          expand="block"
          routerLink="/results"
        >
          Ver resultados
        </IonButton>

        <IonButton
          expand="block"
          fill="outline"
          routerLink="/ranking"
        >
          Ver ranking
        </IonButton>

        <IonButton
          expand="block"
          color="danger"
          onClick={
            cerrarSesion
          }
        >
          Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Home;