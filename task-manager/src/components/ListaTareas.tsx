import { IonList } from "@ionic/react";

import type { Tarea } from "../types/Tarea";
import TareaItem from "./TareaItem";

type PropiedadesLista = {
  tareas: Tarea[];
  completarTarea: (id: number) => void;
  eliminarTarea: (id: number) => void;
};

function ListaTareas({
  tareas,
  completarTarea,
  eliminarTarea,
}: PropiedadesLista) {
  if (tareas.length === 0) {
    return (
      <p className="mensaje-vacio">
        No hay tareas.
      </p>
    );
  }

  return (
    <IonList>
      {tareas.map((tarea) => (
        <TareaItem
          key={tarea.id}
          tarea={tarea}
          completarTarea={completarTarea}
          eliminarTarea={eliminarTarea}
        />
      ))}
    </IonList>
  );
}

export default ListaTareas;