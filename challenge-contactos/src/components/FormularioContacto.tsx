import { useState } from "react";

type PropiedadesFormulario = {
  agregarContacto: (nombre: string, telefono: string) => void;
};

function FormularioContacto({
  agregarContacto,
}: PropiedadesFormulario) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  function guardarContacto() {
    if (nombre.trim() === "" || telefono.trim() === "") {
      return;
    }

    agregarContacto(nombre, telefono);

    setNombre("");
    setTelefono("");
  }

  return (
    <div className="formulario">
      <h2>Agregar contacto</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(evento) => setNombre(evento.target.value)}
      />

      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(evento) => setTelefono(evento.target.value)}
      />

      <button onClick={guardarContacto}>
        Agregar
      </button>
    </div>
  );
}

export default FormularioContacto;