import type { Contacto } from "../types/Contacto";

type PropiedadesContacto = {
  contacto: Contacto;
  eliminarContacto: (id: number) => void;
};

function ContactoItem({
  contacto,
  eliminarContacto,
}: PropiedadesContacto) {
  return (
    <div className="contacto">
      <div>
        <h3>{contacto.nombre}</h3>
        <p>{contacto.telefono}</p>
      </div>

      <button onClick={() => eliminarContacto(contacto.id)}>
        Eliminar
      </button>
    </div>
  );
}

export default ContactoItem;