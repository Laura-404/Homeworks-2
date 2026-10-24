import { useState } from "react";

import {
  LocalNotifications,
} from "@capacitor/local-notifications";

export function useLocalNotifications() {
  const [mensaje, setMensaje] =
    useState("");

  async function programar() {
    try {
      let permiso =
        await LocalNotifications
          .checkPermissions();

      if (
        permiso.display !==
        "granted"
      ) {
        permiso =
          await LocalNotifications
            .requestPermissions();
      }

      if (
        permiso.display !==
        "granted"
      ) {
        setMensaje(
          "Permiso de notificaciones denegado"
        );

        return;
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,

            title:
              "Challenge 7",

            body:
              "Esta es una notificación local",

            schedule: {
              at: new Date(
                Date.now() + 5000
              ),
            },
          },
        ],
      });

      setMensaje(
        "Notificación programada para 5 segundos"
      );
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible programar la notificación"
      );
    }
  }

  return {
    mensaje,
    programar,
  };
}