import { collection, doc, updateDoc } from "@firebase/firestore";
import { db } from "../credentials";

const addExperience = async (obj, userId, idExperience) => {
    
  try {
    const newExp = doc(collection(db, "HomeTest", userId, "experiencies", idExperience));
    const expToCollection = doc(collection(db, "Experiencies", idExperience));

    await updateDoc(newExp, obj);
    await updateDoc(expToCollection, obj);

    return true

  } catch (error) {
    console.log(null);
  }

};

export default addExperience;
