type PropiedadesBuscador = {
  busqueda: string;
  cambiarBusqueda: (
    valor: string
  ) => void;
};

function BuscadorPacientes({
  busqueda,
  cambiarBusqueda,
}: PropiedadesBuscador) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar por nombre, apellido o CC"
        value={busqueda}
        onChange={(evento) =>
          cambiarBusqueda(
            evento.target.value
          )
        }
      />
    </div>
  );
}

export default BuscadorPacientes;