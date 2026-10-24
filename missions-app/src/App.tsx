import {
  IonApp,
  IonLoading,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";

import {
  IonReactRouter,
} from "@ionic/react-router";

import {
  useContext,
} from "react";

import {
  Navigate,
  Route,
} from "react-router-dom";

import {
  AuthContext,
} from "./context/AuthContext";

import Login
  from "./pages/Login";

import Register
  from "./pages/Register";

import Home
  from "./pages/Home";

import MisionFoto
  from "./pages/MisionFoto";

import MisionMovimiento
  from "./pages/MisionMovimiento";

import MisionPermanencia
  from "./pages/MisionPermanencia";

import Resultados
  from "./pages/Resultados";

import Ranking
  from "./pages/Ranking";

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
  const {
    logueado,
    cargando,
  } = useContext(
    AuthContext
  );

  if (cargando) {
    return (
      <IonApp>
        <IonLoading
          isOpen={true}
          message="Cargando..."
        />
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/login"
            element={
              logueado
                ? (
                  <Navigate
                    to="/home"
                    replace
                  />
                )
                : <Login />
            }
          />

          <Route
            path="/register"
            element={
              logueado
                ? (
                  <Navigate
                    to="/home"
                    replace
                  />
                )
                : <Register />
            }
          />

          <Route
            path="/home"
            element={
              logueado
                ? <Home />
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/mission/photo"
            element={
              logueado
                ? <MisionFoto />
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/mission/movement"
            element={
              logueado
                ? (
                  <MisionMovimiento />
                )
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/mission/stay"
            element={
              logueado
                ? (
                  <MisionPermanencia />
                )
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/results"
            element={
              logueado
                ? <Resultados />
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/ranking"
            element={
              logueado
                ? <Ranking />
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/"
            element={
              <Navigate
                to={
                  logueado
                    ? "/home"
                    : "/login"
                }
                replace
              />
            }
          />

          <Route
            path="*"
            element={
              <Navigate
                to={
                  logueado
                    ? "/home"
                    : "/login"
                }
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