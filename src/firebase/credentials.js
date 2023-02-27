import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getReactNativePersistence } from "firebase/auth/react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const firebaseConfig = {
  apiKey: "AIzaSyB5dbKO0HFevN1gV70T7-174JvON4lpDcE",
  authDomain: "tinder-clone-82dec.firebaseapp.com",
  projectId: "tinder-clone-82dec",
  storageBucket: "tinder-clone-82dec.appspot.com",
  messagingSenderId: "525014269077",
  appId: "1:525014269077:web:74b12dafaac1ee0dc22f9c"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const storage = getStorage(firebaseApp)
export const db = getFirestore(firebaseApp);

export const mainCollection = "HomeTest";
export const matchCollection = "Matches";
export const postCollection = "Posts";


export default firebaseApp;
