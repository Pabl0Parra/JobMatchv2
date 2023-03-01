import { collection, doc, updateDoc } from "@firebase/firestore";
import { db } from "../credentials";

const updateExperience = async (obj, userId, idExperience) => {
    
  try {
    const newExp = doc(collection(db, "HomeTest", userId, "experiences"), idExperience);
   /*  const expToCollection = doc(collection(db, "Experiences"), idExperience);  */

    await updateDoc(newExp, obj);
   /*  await updateDoc(expToCollection, obj); */

    return true

  } catch (error) {
    console.log(error);
  }

};

export default updateExperience;
