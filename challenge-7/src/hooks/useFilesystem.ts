import { useState } from "react";

import {
  Directory,
  Encoding,
  Filesystem,
} from "@capacitor/filesystem";

export function useFilesystem() {
  const [
    contenidoLeido,
    setContenidoLeido,
  ] = useState("");

  const [mensaje, setMensaje] =
    useState("");

  async function guardarArchivo(
    contenido: string
  ) {
    try {
      await Filesystem.writeFile({
        path: "challenge7.txt",
        data: contenido,
        directory:
          Directory.Documents,
        encoding:
          Encoding.UTF8,
      });

      setMensaje(
        "Archivo guardado"
      );
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible guardar el archivo"
      );
    }
  }

  async function leerArchivo() {
    try {
      const resultado =
        await Filesystem.readFile({
          path:
            "challenge7.txt",

          directory:
            Directory.Documents,

          encoding:
            Encoding.UTF8,
        });

      if (
        typeof resultado.data ===
        "string"
      ) {
        setContenidoLeido(
          resultado.data
        );
      }

      setMensaje(
        "Archivo leído"
      );
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible leer el archivo"
      );
    }
  }

  async function eliminarArchivo() {
    try {
      await Filesystem.deleteFile({
        path: "challenge7.txt",
        directory:
          Directory.Documents,
      });

      setContenidoLeido("");

      setMensaje(
        "Archivo eliminado"
      );
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible eliminar el archivo"
      );
    }
  }

  return {
    contenidoLeido,
    mensaje,
    guardarArchivo,
    leerArchivo,
    eliminarArchivo,
  };
}