import { db } from "../credentials";
import { collection, addDoc } from "firebase/firestore";

export default createUser = async (data) => {
  try {
    const collectionRef = collection(db, "user");
    const userId = await addDoc(collectionRef, data);
    console.log(userId);
  } catch (error) {
    console.log(error);
  }
};
