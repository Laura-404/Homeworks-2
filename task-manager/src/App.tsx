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

import Login
  from "./pages/Login";

import Register
  from "./pages/Register";

import ListaTareas
  from "./pages/ListaTareas";

import FormularioTarea
  from "./pages/FormularioTarea";

import DetalleTarea
  from "./pages/DetalleTarea";

import {
  AuthContext,
} from "./context/AuthContext";

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
          message="Cargando sesión..."
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
                    to="/tasks"
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
                    to="/tasks"
                    replace
                  />
                )
                : <Register />
            }
          />

          <Route
            path="/tasks"
            element={
              logueado
                ? <ListaTareas />
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/tasks/add"
            element={
              logueado
                ? <FormularioTarea />
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/tasks/edit/:id"
            element={
              logueado
                ? <FormularioTarea />
                : (
                  <Navigate
                    to="/login"
                    replace
                  />
                )
            }
          />

          <Route
            path="/tasks/:id"
            element={
              logueado
                ? <DetalleTarea />
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
                    ? "/tasks"
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
                    ? "/tasks"
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