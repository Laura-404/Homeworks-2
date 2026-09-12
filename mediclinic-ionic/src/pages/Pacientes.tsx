import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

function Pacientes() {
  const pacientes = [
    "Andrea Torres",
    "Felipe Gómez",
    "María López",
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            Pacientes
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {pacientes.map(
            (paciente, indice) => (
              <IonItem
                key={indice}
              >
                {paciente}
              </IonItem>
            )
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Pacientes;