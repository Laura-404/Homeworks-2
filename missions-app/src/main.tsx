import {
  StrictMode,
} from "react";

import {
  createRoot,
} from "react-dom/client";

import App from "./App";

import {
  AuthProvider,
} from "./context/AuthContext";

import {
  MissionProvider,
} from "./context/MissionContext";

createRoot(
  document.getElementById(
    "root"
  )!
).render(
  <StrictMode>
    <AuthProvider>
      <MissionProvider>
        <App />
      </MissionProvider>
    </AuthProvider>
  </StrictMode>
);