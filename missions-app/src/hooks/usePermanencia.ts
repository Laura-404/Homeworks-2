import {
  useEffect,
  useState,
} from "react";

import {
  Motion,
} from "@capacitor/motion";

import {
  Haptics,
} from "@capacitor/haptics";

const SEGUNDOS_OBJETIVO = 10;

const UMBRAL_MOVIMIENTO =
  0.35;

export function usePermanencia() {
  const [
    segundosQuieto,
    setSegundosQuieto,
  ] = useState(0);

  const [activo, setActivo] =
    useState(false);

  const [
    intervaloId,
    setIntervaloId,
  ] = useState(0);

  const [mensaje, setMensaje] =
    useState(
      "Mantente quieto durante 10 segundos"
    );

  useEffect(() => {
    return () => {
      if (intervaloId !== 0) {
        window.clearInterval(
          intervaloId
        );
      }

      Motion.removeAllListeners();
    };
  }, [intervaloId]);

  async function iniciarPermanencia(
    alCompletar: () => void
  ) {
    try {
      await Motion
        .removeAllListeners();

      setSegundosQuieto(0);
      setActivo(true);

      setMensaje(
        "Quédate quieto..."
      );

      let ultimoMovimiento =
        Date.now();

      await Motion.addListener(
        "accel",
        (evento) => {
          const x =
            evento.acceleration
              ?.x ?? 0;

          const y =
            evento.acceleration
              ?.y ?? 0;

          const z =
            evento.acceleration
              ?.z ?? 0;

          const movimiento =
            Math.sqrt(
              x * x +
              y * y +
              z * z
            );

          if (
            movimiento >
            UMBRAL_MOVIMIENTO
          ) {
            ultimoMovimiento =
              Date.now();

            setSegundosQuieto(
              0
            );
          }
        }
      );

      const nuevoIntervalo =
        window.setInterval(
          async () => {
            const segundos =
              Math.floor(
                (
                  Date.now() -
                  ultimoMovimiento
                ) /
                  1000
              );

            setSegundosQuieto(
              Math.min(
                segundos,
                SEGUNDOS_OBJETIVO
              )
            );

            if (
              segundos >=
              SEGUNDOS_OBJETIVO
            ) {
              window.clearInterval(
                nuevoIntervalo
              );

              setIntervaloId(
                0
              );

              await Motion
                .removeAllListeners();

              await Haptics.vibrate({
                duration: 500,
              });

              setActivo(false);

              setMensaje(
                "Misión completada"
              );

              alCompletar();
            }
          },
          500
        );

      setIntervaloId(
        nuevoIntervalo
      );
    } catch (error) {
      console.error(error);

      setActivo(false);

      setMensaje(
        "No fue posible iniciar el acelerómetro"
      );
    }
  }

  async function detener() {
    if (
      intervaloId !== 0
    ) {
      window.clearInterval(
        intervaloId
      );
    }

    await Motion
      .removeAllListeners();

    setIntervaloId(0);
    setActivo(false);

    setSegundosQuieto(0);

    setMensaje(
      "Misión detenida"
    );
  }

  return {
    segundosQuieto,
    activo,
    mensaje,
    iniciarPermanencia,
    detener,
  };
}