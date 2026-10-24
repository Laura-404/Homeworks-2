import { useState } from "react";

import {
  Haptics,
  ImpactStyle,
} from "@capacitor/haptics";

export function useHaptics() {
  const [mensaje, setMensaje] =
    useState("");

  async function vibrar() {
    try {
      await Haptics.impact({
        style:
          ImpactStyle.Medium,
      });

      setMensaje(
        "Respuesta háptica ejecutada"
      );
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible ejecutar la vibración"
      );
    }
  }

  return {
    mensaje,
    vibrar,
  };
}