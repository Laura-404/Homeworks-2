import {
  useEffect,
  useState,
} from "react";

import {
  Geolocation,
} from "@capacitor/geolocation";

const DISTANCIA_OBJETIVO = 10;

export function useGeolocationMision() {
  const [
    distancia,
    setDistancia,
  ] = useState(0);

  const [
    seguimientoId,
    setSeguimientoId,
  ] = useState("");

  const [activo, setActivo] =
    useState(false);

  const [mensaje, setMensaje] =
    useState(
      "Presiona iniciar para guardar tu posición inicial"
    );

  useEffect(() => {
    return () => {
      if (
        seguimientoId !== ""
      ) {
        Geolocation.clearWatch({
          id: seguimientoId,
        });
      }
    };
  }, [seguimientoId]);

  function calcularDistancia(
    latitud1: number,
    longitud1: number,
    latitud2: number,
    longitud2: number
  ) {
    const radioTierra =
      6371000;

    const diferenciaLatitud =
      gradosARadianes(
        latitud2 -
        latitud1
      );

    const diferenciaLongitud =
      gradosARadianes(
        longitud2 -
        longitud1
      );

    const a =
      Math.sin(
        diferenciaLatitud / 2
      ) ** 2 +
      Math.cos(
        gradosARadianes(
          latitud1
        )
      ) *
        Math.cos(
          gradosARadianes(
            latitud2
          )
        ) *
        Math.sin(
          diferenciaLongitud / 2
        ) ** 2;

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return radioTierra * c;
  }

  function gradosARadianes(
    grados: number
  ) {
    return (
      grados *
      Math.PI /
      180
    );
  }

  async function iniciarRecorrido(
    alCompletar:
      (distanciaFinal: number) =>
        void
  ) {
    try {
      await Geolocation
        .requestPermissions();

      const posicionInicial =
        await Geolocation
          .getCurrentPosition({
            enableHighAccuracy:
              true,
          });

      const latitudInicial =
        posicionInicial.coords
          .latitude;

      const longitudInicial =
        posicionInicial.coords
          .longitude;

      setDistancia(0);
      setActivo(true);

      setMensaje(
        "Posición inicial guardada. Comienza a caminar."
      );

      let idActual = "";

      idActual =
        await Geolocation
          .watchPosition(
            {
              enableHighAccuracy:
                true,
            },
            async (
              posicion,
              error
            ) => {
              if (error) {
                console.error(error);
                return;
              }

              if (!posicion) {
                return;
              }

              const distanciaActual =
                calcularDistancia(
                  latitudInicial,
                  longitudInicial,
                  posicion.coords
                    .latitude,
                  posicion.coords
                    .longitude
                );

              setDistancia(
                distanciaActual
              );

              if (
                distanciaActual >=
                DISTANCIA_OBJETIVO
              ) {
                if (
                  idActual !== ""
                ) {
                  await Geolocation
                    .clearWatch({
                      id:
                        idActual,
                    });
                }

                setSeguimientoId(
                  ""
                );

                setActivo(false);

                setMensaje(
                  "Recorrido completado"
                );

                alCompletar(
                  distanciaActual
                );
              }
            }
          );

      setSeguimientoId(
        idActual
      );
    } catch (error) {
      console.error(error);

      setActivo(false);

      setMensaje(
        "No fue posible iniciar el GPS"
      );
    }
  }

  async function detenerRecorrido() {
    if (
      seguimientoId !== ""
    ) {
      await Geolocation
        .clearWatch({
          id: seguimientoId,
        });
    }

    setSeguimientoId("");
    setActivo(false);

    setMensaje(
      "Recorrido detenido"
    );
  }

  return {
    distancia,
    distanciaObjetivo: DISTANCIA_OBJETIVO,
    activo,
    mensaje,
    iniciarRecorrido,
    detenerRecorrido,
  };
}