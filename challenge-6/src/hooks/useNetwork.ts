import {
  useEffect,
  useState,
} from "react";

import {
  Network,
} from "@capacitor/network";

export function useNetwork() {
  const [isOnline, setIsOnline] =
    useState(true);

  const [
    connectionType,
    setConnectionType,
  ] = useState("unknown");

  useEffect(() => {
    async function consultarEstado() {
      try {
        const estado =
          await Network.getStatus();

        setIsOnline(
          estado.connected
        );

        setConnectionType(
          estado.connectionType
        );
      } catch (error) {
        console.error(error);
      }
    }

    consultarEstado();

    const listener =
      Network.addListener(
        "networkStatusChange",
        (estado) => {
          setIsOnline(
            estado.connected
          );

          setConnectionType(
            estado.connectionType
          );
        }
      );

    return () => {
      listener.then(
        (control) =>
          control.remove()
      );
    };
  }, []);

  return {
    isOnline,
    connectionType,
  };
}