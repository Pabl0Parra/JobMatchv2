import { collection, doc, updateDoc } from "@firebase/firestore";
import { db, mainCollection } from "../credentials";

const updateAboutMe = async (description, userId) => {
    
  try {
    const collectionRef = collection(db, mainCollection)
    const userDoc = doc(collectionRef, userId)

    await updateDoc(userDoc, {
        aboutme: description
    });

    return true

  } catch (error) {
    console.log(error)
  }

};

export default updateAboutMe;