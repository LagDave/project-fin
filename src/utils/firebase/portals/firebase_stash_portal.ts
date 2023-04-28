import { db } from "../firebase_init";
import { collection, doc, setDoc, deleteDoc, addDoc, onSnapshot, query, updateDoc} from "firebase/firestore";
import {v4 as uuidv4} from "uuid";

const createStash = async (uid: string, stashName: string,) => {

  const stashUniqueID = uuidv4();

  await setDoc(doc(db, uid, stashUniqueID), {
    stashName,
    dateCreated: Date.now(),
    transactions: {},
  });
}

const deleteStash = async (uid: string, stashId: string) => {
  await deleteDoc(doc(db, uid, stashId));
}

const editStash = async (uid: string, newStashName: string, stashId: string) => {
  await updateDoc(doc(db, uid, stashId), {
    stashName: newStashName
  })
}

const onStashUpdate = (uid: string, callback: any) => {
  const q = query(collection(db, uid));
  onSnapshot(q, callback)
}

export {createStash, deleteStash, editStash, onStashUpdate}