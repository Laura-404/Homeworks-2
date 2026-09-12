import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import {
  calendarOutline,
  peopleOutline,
  personCircleOutline,
} from "ionicons/icons";

import {
  Navigate,
  Route,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import Visitas from "./Visitas";
import DetalleVisita from "./DetalleVisita";
import Pacientes from "./Pacientes";
import Perfil from "./Perfil";

import type { Visita } from "../types/Visita";

const CLAVE_LOGIN =
  "mediclinic_ionic_logged";

const CLAVE_VISITAS =
  "mediclinic_ionic_visitas";

const visitasIniciales: Visita[] = [
  {
    id: 1,
    paciente: "Andrea Torres",
    hora: "8:00 AM",
    estado: "pendiente",
  },
  {
    id: 2,
    paciente: "Felipe Gómez",
    hora: "10:30 AM",
    estado: "pendiente",
  },
  {
    id: 3,
    paciente: "María López",
    hora: "2:00 PM",
    estado: "pendiente",
  },
];

function cargarVisitas() {
  const guardadas =
    localStorage.getItem(
      CLAVE_VISITAS
    );

  if (guardadas) {
    const visitasGuardadas: Visita[] =
      JSON.parse(guardadas);

    return visitasGuardadas;
  }

  return visitasIniciales;
}

function Tabs() {
  const logged =
    localStorage.getItem(
      CLAVE_LOGIN
    ) === "true";

  const [visitas, setVisitas] =
    useState(cargarVisitas());

  useEffect(() => {
    localStorage.setItem(
      CLAVE_VISITAS,
      JSON.stringify(visitas)
    );
  }, [visitas]);

  function cambiarEstado(
    id: number
  ) {
    setVisitas(
      (visitasAnteriores) =>
        visitasAnteriores.map(
          (visita) => {
            if (
              visita.id !== id
            ) {
              return visita;
            }

            let nuevoEstado =
              visita.estado;

            if (
              visita.estado ===
              "pendiente"
            ) {
              nuevoEstado =
                "en_camino";
            } else if (
              visita.estado ===
              "en_camino"
            ) {
              nuevoEstado =
                "finalizada";
            }

            return {
              ...visita,
              estado: nuevoEstado,
            };
          }
        )
    );
  }

  if (!logged) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route
          path="visitas"
          element={
            <Visitas
              visitas={visitas}
            />
          }
        />

        <Route
          path="visitas/:id"
          element={
            <DetalleVisita
              visitas={visitas}
              cambiarEstado={
                cambiarEstado
              }
            />
          }
        />

        <Route
          path="pacientes"
          element={
            <Pacientes />
          }
        />

        <Route
          path="perfil"
          element={<Perfil />}
        />

        <Route
          index
          element={
            <Navigate
              to="visitas"
              replace
            />
          }
        />
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton
          tab="visitas"
          href="/tabs/visitas"
        >
          <IonIcon
            icon={calendarOutline}
          />

          <IonLabel>
            Visitas
          </IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="pacientes"
          href="/tabs/pacientes"
        >
          <IonIcon
            icon={peopleOutline}
          />

          <IonLabel>
            Pacientes
          </IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="perfil"
          href="/tabs/perfil"
        >
          <IonIcon
            icon={
              personCircleOutline
            }
          />

          <IonLabel>
            Perfil
          </IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default Tabs;