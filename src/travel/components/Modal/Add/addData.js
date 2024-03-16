import {db} from "../../../firebase"
import { doc, setDoc } from "firebase/firestore";

export function addData(infoData) {
  // const collectionRef = db.collection("tangamandapio").doc().set(infoData);
  //  const docRef = db.doc(collectionRef);
  //  db(docRef, infoData);

  const myDb = doc(db, "tangamandapio", infoData.id);
  setDoc(myDb, infoData);
}

export default addData;
