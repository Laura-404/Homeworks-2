import { useState } from "react";

import {
  Geolocation,
} from "@capacitor/geolocation";

export function useGeolocation() {
  const [latitud, setLatitud] =
    useState(0);

  const [longitud, setLongitud] =
    useState(0);

  const [
    seguimientoId,
    setSeguimientoId,
  ] = useState("");

  const [mensaje, setMensaje] =
    useState(
      "Todavía no se ha obtenido la ubicación"
    );

  async function obtenerUbicacion() {
    try {
      await Geolocation.requestPermissions();

      const posicion =
        await Geolocation.getCurrentPosition();

      setLatitud(
        posicion.coords.latitude
      );

      setLongitud(
        posicion.coords.longitude
      );

      setMensaje(
        "Ubicación obtenida"
      );
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible obtener la ubicación"
      );
    }
  }

  async function iniciarSeguimiento() {
    try {
      await Geolocation.requestPermissions();

      const id =
        await Geolocation.watchPosition(
          {},
          (posicion, error) => {
            if (error) {
              console.error(error);
              return;
            }

            if (posicion) {
              setLatitud(
                posicion.coords.latitude
              );

              setLongitud(
                posicion.coords.longitude
              );
            }
          }
        );

      setSeguimientoId(id);

      setMensaje(
        "Seguimiento activado"
      );
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible iniciar el seguimiento"
      );
    }
  }

  async function detenerSeguimiento() {
    if (seguimientoId === "") {
      return;
    }

    await Geolocation.clearWatch({
      id: seguimientoId,
    });

    setSeguimientoId("");

    setMensaje(
      "Seguimiento detenido"
    );
  }

  return {
    latitud,
    longitud,
    seguimientoId,
    mensaje,
    obtenerUbicacion,
    iniciarSeguimiento,
    detenerSeguimiento,
  };
}