import { db } from "../firebase_init";
import { collection, doc, setDoc, addDoc, onSnapshot, query} from "firebase/firestore";

const createStash = async (uid: string, stashName: string,) => {
  await setDoc(doc(db, `${uid}`, stashName), {
    dateCreated: Date.now(),
    transactions: {},
  });
}

const onStashUpdate = (uid: string, callback: any) => {
  const q = query(collection(db, uid));
  onSnapshot(q, callback)
}

export {createStash, onStashUpdate}