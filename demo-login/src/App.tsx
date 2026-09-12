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

import Login from "./pages/Login";
import Lista from "./pages/Lista";

/* Core CSS required for Ionic components */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utilities */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

function App() {
  const estaLogueado =
    localStorage.getItem("logged") ===
    "true";

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/list"
            element={<Lista />}
          />

          <Route
            path="/"
            element={
              <Navigate
                to={
                  estaLogueado
                    ? "/list"
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
                  estaLogueado
                    ? "/list"
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