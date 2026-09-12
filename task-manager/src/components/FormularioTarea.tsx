import { useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
} from "@ionic/react";

type PropiedadesFormulario = {
  agregarTarea: (titulo: string) => void;
};

function FormularioTarea({
  agregarTarea,
}: PropiedadesFormulario) {
  const [titulo, setTitulo] = useState("");

  function guardarTarea() {
    if (titulo.trim() === "") {
      return;
    }

    agregarTarea(titulo);

    setTitulo("");
  }

  return (
    <div className="formulario-tarea">
      <IonItem>
        <IonInput
          label="Nueva tarea"
          labelPlacement="stacked"
          placeholder="Ej: Estudiar Ionic"
          value={titulo}
          onIonInput={(evento) =>
            setTitulo(evento.detail.value ?? "")
          }
        />
      </IonItem>

      <IonButton
        expand="block"
        onClick={guardarTarea}
      >
        Agregar tarea
      </IonButton>
    </div>
  );
}

export default FormularioTarea;