import { useState } from "react";

type PropiedadesFormulario = {
  agregarPaciente: (
    nombre: string,
    apellido: string,
    cc: string,
    telefono: string
  ) => void;
};

function FormularioPaciente({
  agregarPaciente,
}: PropiedadesFormulario) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] =
    useState("");
  const [cc, setCc] = useState("");
  const [telefono, setTelefono] =
    useState("");
  const [mensaje, setMensaje] =
    useState("");

  function guardarPaciente() {
    if (
      nombre.trim() === "" ||
      apellido.trim() === "" ||
      cc.trim() === ""
    ) {
      setMensaje(
        "Nombre, apellido y CC son obligatorios"
      );

      return;
    }

    if (isNaN(Number(cc))) {
      setMensaje(
        "La CC debe contener números"
      );

      return;
    }

    agregarPaciente(
      nombre,
      apellido,
      cc,
      telefono
    );

    setNombre("");
    setApellido("");
    setCc("");
    setTelefono("");
    setMensaje("");
  }

  return (
    <div className="formulario">
      <h2>Agregar paciente</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(evento) =>
          setNombre(evento.target.value)
        }
      />

      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(evento) =>
          setApellido(evento.target.value)
        }
      />

      <input
        type="text"
        placeholder="CC"
        value={cc}
        onChange={(evento) =>
          setCc(evento.target.value)
        }
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(evento) =>
          setTelefono(evento.target.value)
        }
      />

      <button onClick={guardarPaciente}>
        Agregar paciente
      </button>

      {mensaje !== "" && (
        <p className="error">{mensaje}</p>
      )}
    </div>
  );
}

export default FormularioPaciente;