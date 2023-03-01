import { collection, doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db, mainCollection } from "../credentials";

const addExperience = async (obj, userId) => {
    
  try {
    const newExp = doc(collection(db, mainCollection, userId, "experiences"));
    const expToCollection = doc(collection(db, "Experiences"));

    await setDoc(expToCollection, {
      ...obj,
      id: expToCollection.id,
      userId,
      timestamp: serverTimestamp(),
    });
    return await setDoc(newExp, {
      ...obj,
      id: newExp.id,
      userId,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.log(error)
  }

};

export default addExperience;
