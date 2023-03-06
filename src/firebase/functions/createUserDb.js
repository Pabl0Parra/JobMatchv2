import { db } from "../credentials";
import { collection, addDoc } from "firebase/firestore";

const createUserDb = async (data) => {
  try {
    const collectionRef = collection(db, "users");
    const userId = await addDoc(collectionRef, data);
    return userId;
  } catch (error) {
    console.log(error);
  }
};

export default createUserDb;