import Dexie from "dexie";

const db =
  new Dexie(
    "Challenge6DB"
  );

db.version(1).stores({
  frutas:
    "++id, nombre, createdAt",
});

export default db;