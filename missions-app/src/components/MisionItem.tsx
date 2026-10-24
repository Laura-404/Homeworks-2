import {
  IonButton,
  IonItem,
  IonLabel,
} from "@ionic/react";

type PropiedadesMision = {
  nombre: string;
  descripcion: string;
  puntos: number;
  completed: boolean;
  habilitada: boolean;
  ruta: string;
};

function MisionItem({
  nombre,
  descripcion,
  puntos,
  completed,
  habilitada,
  ruta,
}: PropiedadesMision) {
  return (
    <IonItem>
      <IonLabel>
        <h2>{nombre}</h2>

        <p>
          {descripcion}
        </p>

        <p>
          Puntos: {puntos}
        </p>

        <p>
          Estado:
          {" "}
          {completed
            ? "Completada"
            : habilitada
              ? "Pendiente"
              : "Bloqueada"}
        </p>
      </IonLabel>

      <IonButton
        slot="end"
        routerLink={ruta}
        disabled={
          completed ||
          !habilitada
        }
      >
        Iniciar
      </IonButton>
    </IonItem>
  );
}

export default MisionItem;