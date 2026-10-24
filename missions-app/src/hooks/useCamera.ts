import {
  useState,
} from "react";

import {
  Camera,
  CameraResultType,
  CameraSource,
} from "@capacitor/camera";

export function useCamera() {
  const [imagen, setImagen] =
    useState("");

  const [mensaje, setMensaje] =
    useState("");

  async function tomarFoto() {
    try {
      const foto =
        await Camera.getPhoto({
          quality: 90,

          allowEditing: false,

          resultType:
            CameraResultType.Uri,

          source:
            CameraSource.Camera,

          saveToGallery: true,
        });

      const ruta =
        foto.webPath ?? "";

      setImagen(ruta);

      setMensaje(
        "Foto guardada correctamente"
      );

      return ruta;
    } catch (error) {
      console.error(error);

      setMensaje(
        "No fue posible tomar la foto"
      );

      return "";
    }
  }

  return {
    imagen,
    mensaje,
    tomarFoto,
  };
}