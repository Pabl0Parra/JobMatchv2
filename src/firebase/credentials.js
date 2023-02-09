import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnsaNFMIJ56_S7SU-ULsdYH9pU-jsbHpA",
  authDomain: "jobmatch-fecac.firebaseapp.com",
  projectId: "jobmatch-fecac",
  storageBucket: "jobmatch-fecac.appspot.com",
  messagingSenderId: "605538525851",
  appId: "1:605538525851:web:e3fe31e6b4ab0e11739c3e"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestoreDB(firebaseApp);

export default firebaseApp;