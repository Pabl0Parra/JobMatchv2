import { collection, doc, updateDoc } from "@firebase/firestore";
import { db, mainCollection } from "../credentials";

const updateDataUser = async (obj, userId) => {
    
  try {
    const collectionRef = collection(db, mainCollection)
    const userDoc = doc(collectionRef, userId)

    await updateDoc(userDoc, obj);

    return true

  } catch (error) {
    console.log(error)
  }

};

export default updateDataUser;