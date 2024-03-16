import {db} from "../../../../firebase"

export async function deleteData(datas) {
  await db.collection("tangamandapio").doc(datas.id).delete();
}
