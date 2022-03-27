import { useState, useContext, useEffect, createContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";

const UserAuthProviderContext = createContext();

export function useUserAuthProvider() {
  return useContext(UserAuthProviderContext);
}

export default function UserAuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [Loading, setLoading] = useState(true);
  // LOGIN
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // SIGNUP
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // LOGOUT;
  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
      setLoading(false);
    };
  }, []);

  const value = { signUp, login, user, logout, Loading };

  return (
    <UserAuthProviderContext.Provider value={value}>
      {children}
    </UserAuthProviderContext.Provider>
  );
}
