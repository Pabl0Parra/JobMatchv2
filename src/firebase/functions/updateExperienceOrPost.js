import { collection, doc, updateDoc } from "@firebase/firestore";
import { db } from "../credentials";

const updateExperienceOrPost = async (obj, userId, idExperience, worker) => {
    
  try {
    const newExp = doc(collection(db, "HomeTest", userId, worker? "experiences" : "posts"), idExperience);
   /*  const expToCollection = doc(collection(db, "Experiences"), idExperience);  */

    await updateDoc(newExp, obj);
   /*  await updateDoc(expToCollection, obj); */

    return true

  } catch (error) {
    console.log(error);
  }

};

export default updateExperienceOrPost;
