import {
  useEffect,
  useState,
} from "react";

import "./App.css";

import Login from "./components/Login";
import FormularioPaciente from "./components/FormularioPaciente";
import BuscadorPacientes from "./components/BuscadorPacientes";
import ListaPacientes from "./components/ListaPacientes";

import type { Paciente } from "./types/Paciente";

const CLAVE_LOGIN =
  "mediclinic_pwa_logged";

const CLAVE_PACIENTES =
  "mediclinic_pwa_pacientes";

const pacientesIniciales: Paciente[] = [
  {
    id: 1,
    nombre: "Laura",
    apellido: "Gómez",
    cc: "1001001001",
    telefono: "3001234567",
  },
  {
    id: 2,
    nombre: "Carlos",
    apellido: "Ruiz",
    cc: "1002002002",
    telefono: "3109876543",
  },
];

function cargarPacientes() {
  const guardados =
    localStorage.getItem(
      CLAVE_PACIENTES
    );

  if (guardados) {
    const pacientesGuardados: Paciente[] =
      JSON.parse(guardados);

    return pacientesGuardados;
  }

  return pacientesIniciales;
}

function App() {
  const [logueado, setLogueado] =
    useState(
      localStorage.getItem(
        CLAVE_LOGIN
      ) === "true"
    );

  const [pacientes, setPacientes] =
    useState(cargarPacientes());

  const [busqueda, setBusqueda] =
    useState("");

  useEffect(() => {
    localStorage.setItem(
      CLAVE_PACIENTES,
      JSON.stringify(pacientes)
    );
  }, [pacientes]);

  function iniciarSesion(
    correo: string,
    contrasena: string
  ) {
    if (
      correo ===
        "admin@mediclinic.com" &&
      contrasena === "1234"
    ) {
      localStorage.setItem(
        CLAVE_LOGIN,
        "true"
      );

      setLogueado(true);

      return true;
    }

    return false;
  }

  function cerrarSesion() {
    localStorage.removeItem(
      CLAVE_LOGIN
    );

    setLogueado(false);
  }

  function agregarPaciente(
    nombre: string,
    apellido: string,
    cc: string,
    telefono: string
  ) {
    const nuevoPaciente: Paciente = {
      id: Date.now(),
      nombre: nombre,
      apellido: apellido,
      cc: cc,
      telefono: telefono,
    };

    setPacientes(
      (pacientesAnteriores) => [
        ...pacientesAnteriores,
        nuevoPaciente,
      ]
    );
  }

  const textoBusqueda =
    busqueda.toLowerCase().trim();

  const pacientesFiltrados =
    pacientes.filter((paciente) => {
      return (
        paciente.nombre
          .toLowerCase()
          .includes(textoBusqueda) ||
        paciente.apellido
          .toLowerCase()
          .includes(textoBusqueda) ||
        paciente.cc.includes(
          textoBusqueda
        )
      );
    });

  if (!logueado) {
    return (
      <Login
        iniciarSesion={iniciarSesion}
      />
    );
  }

  return (
    <main className="contenedor">
      <div className="encabezado">
        <h1>MediClinic</h1>

        <button
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </button>
      </div>

      <FormularioPaciente
        agregarPaciente={
          agregarPaciente
        }
      />

      <h2>Pacientes</h2>

      <BuscadorPacientes
        busqueda={busqueda}
        cambiarBusqueda={setBusqueda}
      />

      <ListaPacientes
        pacientes={
          pacientesFiltrados
        }
      />
    </main>
  );
}

export default App;