import {
  useEffect,
  useState,
} from "react";

import {
  Motion,
} from "@capacitor/motion";

export function useAccelerometer() {
  const [x, setX] =
    useState(0);

  const [y, setY] =
    useState(0);

  const [z, setZ] =
    useState(0);

  const [alpha, setAlpha] =
    useState(0);

  const [beta, setBeta] =
    useState(0);

  const [gamma, setGamma] =
    useState(0);

  const [
    escuchando,
    setEscuchando,
  ] = useState(false);

  async function iniciar() {
    try {
      await Motion.addListener(
        "accel",
        (evento) => {
          setX(
            evento.acceleration?.x ??
              0
          );

          setY(
            evento.acceleration?.y ??
              0
          );

          setZ(
            evento.acceleration?.z ??
              0
          );
        }
      );

      await Motion.addListener(
        "orientation",
        (evento) => {
          setAlpha(
            evento.alpha ?? 0
          );

          setBeta(
            evento.beta ?? 0
          );

          setGamma(
            evento.gamma ?? 0
          );
        }
      );

      setEscuchando(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function detener() {
    await Motion.removeAllListeners();

    setEscuchando(false);
  }

  useEffect(() => {
    return () => {
      Motion.removeAllListeners();
    };
  }, []);

  return {
    x,
    y,
    z,
    alpha,
    beta,
    gamma,
    escuchando,
    iniciar,
    detener,
  };
}