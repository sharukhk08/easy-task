import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const usersRef = collection(db, "users");
const tasksRef = collection(db, "tasks");

export const easytasksService = {
  addNewUser: async (newUser) => {
    return await addDoc(usersRef, newUser);
  },

  getUserDetails: async (id) => {
    const userdetails = doc(db, "users", id);
    return await getDoc(userdetails);
  },

  addTask: async (newTask) => {
    return await addDoc(tasksRef, newTask);
  },

  deleteTask: async (id) => {
    const taskDoc = doc(db, "tasks", id);
    return await deleteDoc(taskDoc);
  },

  //   getAllCollections: async () => {
  //     return await getDocs(nftCollectionsRef);
  //   },
  //   updateNftCollection: async (id, updatedNft) => {
  //     const nftDoc = doc(db, "nftCollections", id);
  //     return await updateDoc(nftDoc, updatedNft);
  //   },

  //   deleteNftCollection: async (id) => {
  //     const nftDoc = doc(db, "nftCollections", id);
  //     return await deleteDoc(nftDoc);
  //   },
};
