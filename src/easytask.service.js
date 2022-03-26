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

export const easytasksService = {
  addNewUser: async (newUser) => {
    return await addDoc(usersRef, newUser);
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

  //   getNftCollectionDetails: async (id) => {
  //     const nftDoc = doc(db, "nftCollections", id);
  //     return await getDoc(nftDoc);
  //   },
};
