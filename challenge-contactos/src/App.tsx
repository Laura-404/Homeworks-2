import { useEffect, useState } from "react";
import "./App.css";

import FormularioContacto from "./components/FormularioContacto";
import ListaContactos from "./components/ListaContactos";
import Loader from "./components/Loader";

import { contactosIniciales } from "./data/contactosIniciales";
import type { Contacto } from "./types/Contacto";

const contactosVacios: Contacto[] = [];

function App() {
  const [contactos, setContactos] = useState(contactosVacios);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setContactos(contactosIniciales);
      setCargando(false);
    }, 1500);

    return () => {
      clearTimeout(temporizador);
    };
  }, []);

  function agregarContacto(nombre: string, telefono: string) {
    const nuevoContacto: Contacto = {
      id: Date.now(),
      nombre: nombre,
      telefono: telefono,
    };

    setContactos((contactosAnteriores) => [
      ...contactosAnteriores,
      nuevoContacto,
    ]);
  }

  function eliminarContacto(id: number) {
    setContactos((contactosAnteriores) =>
      contactosAnteriores.filter(
        (contacto) => contacto.id !== id
      )
    );
  }

  if (cargando) {
    return <Loader />;
  }

  return (
    <main className="contenedor">
      <h1>Lista de contactos</h1>
      <img
        src="/images/contactos.png"
        alt="Imagen de contactos"
        className="imagen-principal"
      />

      <FormularioContacto
        agregarContacto={agregarContacto}
      />

      <ListaContactos
        contactos={contactos}
        eliminarContacto={eliminarContacto}
      />
    </main>
  );
}

export default App;