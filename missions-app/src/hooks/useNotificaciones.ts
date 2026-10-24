import {
  LocalNotifications,
} from "@capacitor/local-notifications";

export function useNotificaciones() {
  async function solicitarPermiso() {
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

      return (
        permiso.display ===
        "granted"
      );
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  async function notificarMision(
    misionesFaltantes: number
  ) {
    const permitido =
      await solicitarPermiso();

    if (!permitido) {
      return;
    }

    const idBase =
      Math.floor(
        Date.now() %
        2000000000
      );

    const notificaciones = [
      {
        id: idBase,
        title:
          "Misión completada",
        body:
          "Has completado una misión",
      },
    ];

    if (
      misionesFaltantes === 1
    ) {
      notificaciones.push({
        id: idBase + 1,
        title:
          "¡Ya casi terminas!",
        body:
          "Te falta 1 misión para completar",
      });
    }

    await LocalNotifications
      .schedule({
        notifications:
          notificaciones,
      });
  }

  return {
    notificarMision,
  };
}