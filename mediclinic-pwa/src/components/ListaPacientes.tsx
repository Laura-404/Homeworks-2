import type { Paciente } from "../types/Paciente";

type PropiedadesLista = {
  pacientes: Paciente[];
};

function ListaPacientes({
  pacientes,
}: PropiedadesLista) {
  if (pacientes.length === 0) {
    return (
      <p>No se encontraron pacientes.</p>
    );
  }

  return (
    <div className="lista-pacientes">
      {pacientes.map((paciente) => (
        <div
          className="paciente"
          key={paciente.id}
        >
          <h3>
            {paciente.nombre}{" "}
            {paciente.apellido}
          </h3>

          <p>CC: {paciente.cc}</p>

          <p>
            Teléfono:{" "}
            {paciente.telefono ||
              "No registrado"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ListaPacientes;