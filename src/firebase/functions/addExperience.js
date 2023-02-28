import { collection, doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db, mainCollection, experiencieCollection } from "../credentials";

const addExperience = async (obj, userId) => {
    
  try {
    const newExp = doc(collection(db, mainCollection, userId, "experiencies"));
    const expToCollection = doc(collection(db, experiencieCollection));

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
    console.log(null);
  }

};

export default addExperience;
