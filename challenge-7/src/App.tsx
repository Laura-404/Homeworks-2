import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";

import {
  IonReactRouter,
} from "@ionic/react-router";

import {
  Navigate,
  Route,
} from "react-router-dom";

import Home
  from "./pages/Home";

import Geolocalizacion
  from "./pages/Geolocalizacion";

import Camara
  from "./pages/Camara";

import Movimiento
  from "./pages/Movimiento";

import Dispositivo
  from "./pages/Dispositivo";

import Haptica
  from "./pages/Haptica";

import Archivos
  from "./pages/Archivos";

import NotificacionesLocales
  from "./pages/NotificacionesLocales";

import NotificacionesPush
  from "./pages/NotificacionesPush";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./theme/variables.css";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/geolocation"
            element={
              <Geolocalizacion />
            }
          />

          <Route
            path="/camera"
            element={<Camara />}
          />

          <Route
            path="/motion"
            element={
              <Movimiento />
            }
          />

          <Route
            path="/device"
            element={
              <Dispositivo />
            }
          />

          <Route
            path="/haptics"
            element={
              <Haptica />
            }
          />

          <Route
            path="/filesystem"
            element={
              <Archivos />
            }
          />

          <Route
            path="/local-notifications"
            element={
              <NotificacionesLocales />
            }
          />

          <Route
            path="/push-notifications"
            element={
              <NotificacionesPush />
            }
          />

          <Route
            path="/"
            element={
              <Navigate
                to="/home"
                replace
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/home"
                replace
              />
            }
          />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;