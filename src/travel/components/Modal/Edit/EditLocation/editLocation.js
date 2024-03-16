import { db } from "../../../../firebase";

function editLocation({ infoData, id }) {
  const collectionRef = db.collection("tangamandapio").doc(id).update(infoData);
  const docRef = db.doc(collectionRef);
  db(docRef, infoData);
}

export default editLocation;
