import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import type { Visita } from "../types/Visita";

type PropiedadesVisitas = {
  visitas: Visita[];
};

function Visitas({
  visitas,
}: PropiedadesVisitas) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Visitas de hoy
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {visitas.map((visita) => (
            <IonItem
              key={visita.id}
              routerLink={
                `/tabs/visitas/${visita.id}`
              }
              routerDirection="forward"
            >
              <IonLabel>
                <h2>
                  {visita.paciente}
                </h2>

                <p>
                  Hora: {visita.hora}
                </p>

                <p>
                  Estado:{" "}
                  {visita.estado}
                </p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Visitas;