import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVpYXthu9wHNtIVjN7HTNKKU7J1aJSw88",
  authDomain: "easy-task-008.firebaseapp.com",
  projectId: "easy-task-008",
  storageBucket: "easy-task-008.appspot.com",
  messagingSenderId: "939300927737",
  appId: "1:939300927737:web:4b55a5eb2dbbf7ce234a28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
