import { useState } from "react";

import {
  Device,
} from "@capacitor/device";

export function useDevice() {
  const [modelo, setModelo] =
    useState("");

  const [
    plataforma,
    setPlataforma,
  ] = useState("");

  const [
    sistemaOperativo,
    setSistemaOperativo,
  ] = useState("");

  const [version, setVersion] =
    useState("");

  const [
    fabricante,
    setFabricante,
  ] = useState("");

  const [bateria, setBateria] =
    useState(0);

  const [
    cargandoBateria,
    setCargandoBateria,
  ] = useState(false);

  async function obtenerInfo() {
    try {
      const info =
        await Device.getInfo();

      const bateriaInfo =
        await Device.getBatteryInfo();

      setModelo(info.model);

      setPlataforma(
        info.platform
      );

      setSistemaOperativo(
        info.operatingSystem
      );

      setVersion(
        info.osVersion
      );

      setFabricante(
        info.manufacturer
      );

      setBateria(
        Math.round(
          (bateriaInfo.batteryLevel ??
            0) * 100
        )
      );

      setCargandoBateria(
        bateriaInfo.isCharging ??
          false
      );
    } catch (error) {
      console.error(error);
    }
  }

  return {
    modelo,
    plataforma,
    sistemaOperativo,
    version,
    fabricante,
    bateria,
    cargandoBateria,
    obtenerInfo,
  };
}