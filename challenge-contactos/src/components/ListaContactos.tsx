import type { Contacto } from "../types/Contacto";
import ContactoItem from "./ContactoItem";

type PropiedadesLista = {
  contactos: Contacto[];
  eliminarContacto: (id: number) => void;
};

function ListaContactos({
  contactos,
  eliminarContacto,
}: PropiedadesLista) {
  if (contactos.length === 0) {
    return <p>No hay contactos registrados.</p>;
  }

  return (
    <div className="lista-contactos">
      {contactos.map((contacto) => (
        <ContactoItem
          key={contacto.id}
          contacto={contacto}
          eliminarContacto={eliminarContacto}
        />
      ))}
    </div>
  );
}

export default ListaContactos;