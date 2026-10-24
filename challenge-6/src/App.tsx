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

import Contactos
  from "./pages/Contactos";

import Tareas
  from "./pages/Tareas";

import Frutas
  from "./pages/Frutas";

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
            path="/contacts"
            element={
              logueado
                ? <Contactos />
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/tasks"
            element={
              logueado
                ? <Tareas />
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/fruits"
            element={
              logueado
                ? <Frutas />
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