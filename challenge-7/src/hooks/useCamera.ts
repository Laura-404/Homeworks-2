import { useState } from "react";

import {
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/camera";

export function useCamera() {
  const [imagen, setImagen] =
    useState("");

  const [mensaje, setMensaje] =
    useState(
      "No se ha seleccionado una imagen"
    );

  async function obtenerFoto() {
    try {
      const foto =
        await Camera.getPhoto({
          quality: 90,
          allowEditing: false,
          resultType:
            CameraResultType.Uri,
          source:
            CameraSource.Prompt,
        });

      setImagen(
        foto.webPath ?? ""
      );

      setMensaje(
        "Imagen obtenida correctamente"
      );
    } catch (error) {
      console.error(error);

      setMensaje(
        "No se pudo obtener la imagen"
      );
    }
  }

  return {
    imagen,
    mensaje,
    obtenerFoto,
  };
}