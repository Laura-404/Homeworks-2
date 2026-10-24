import {
  useEffect,
  useState,
} from "react";

import {
  PushNotifications,
} from "@capacitor/push-notifications";

export function usePushNotifications() {
  const [token, setToken] =
    useState("");

  const [mensaje, setMensaje] =
    useState(
      "Push notifications sin registrar"
    );

  useEffect(() => {
    const registro =
      PushNotifications.addListener(
        "registration",
        (tokenRecibido) => {
          setToken(
            tokenRecibido.value
          );

          setMensaje(
            "Dispositivo registrado"
          );
        }
      );

    const errorRegistro =
      PushNotifications.addListener(
        "registrationError",
        (error) => {
          console.error(error);

          setMensaje(
            "Error al registrar push notifications"
          );
        }
      );

    const notificacionRecibida =
      PushNotifications.addListener(
        "pushNotificationReceived",
        (notificacion) => {
          setMensaje(
            notificacion.body ??
              "Notificación recibida"
          );
        }
      );

    return () => {
      registro.then(
        (listener) =>
          listener.remove()
      );

      errorRegistro.then(
        (listener) =>
          listener.remove()
      );

      notificacionRecibida.then(
        (listener) =>
          listener.remove()
      );
    };
  }, []);

  async function activarPush() {
    try {
      let permiso =
        await PushNotifications
          .checkPermissions();

      if (
        permiso.receive ===
          "prompt" ||
        permiso.receive ===
          "prompt-with-rationale"
      ) {
        permiso =
          await PushNotifications
            .requestPermissions();
      }

      if (
        permiso.receive !==
        "granted"
      ) {
        setMensaje(
          "Permiso de notificaciones denegado"
        );

        return;
      }

      await PushNotifications
        .register();

      setMensaje(
        "Registrando dispositivo..."
      );
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible registrar las notificaciones"
      );
    }
  }

  return {
    token,
    mensaje,
    activarPush,
  };
}