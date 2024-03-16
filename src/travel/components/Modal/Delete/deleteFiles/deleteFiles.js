import {db} from "../../../../firebase"

export function deleteFiles({ infoData, id }) {
  const collectionRef = db.collection("tangamandapio").doc(id).update(infoData);
  const docRef = db.doc(collectionRef);
  db(docRef, infoData);
}


