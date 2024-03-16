import { createContext, useContext, useEffect, useState } from "react"; 
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export const contextoo = createContext();

export const useAutenticado = () => {
  const contextofinal = useContext(contextoo);
  return contextofinal;
};

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null); 

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => {
    signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const loginGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  return (
    <contextoo.Provider
      value={{
        signup,
        loginGoogle,
        resetPassword,
        loading,
        login,
        user,
        logout,
      }}
    >
      {children}
    </contextoo.Provider>
  );
}
