import { createContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/credentials";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginEmailPassword = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      signInWithRedirect(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log("no se pudo mandar el email");
    }
  };

  const createUserDb = async (data) => {
    try {
      const collectionRef = collection(db, "users");
      const userId = await addDoc(collectionRef, data);
      return userId;
    } catch (error) {
      console.log(error);
    }
  };

  const checkRegisteredEmail = async (email) => {
    try {
      const res = await fetchSignInMethodsForEmail(auth, email);
      return res.length !== 0;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        loginEmailPassword,
        logout,
        loginWithGoogle,
        register,
        resetPassword,
        createUserDb,
        checkRegisteredEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
