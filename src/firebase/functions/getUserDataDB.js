import { db } from "../credentials";
import { doc, getDoc } from "firebase/firestore";

const getUserDataDB = async (userId) => {
  try {
    const docRef = doc(db, "HomeTest", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      return null;
    }
  } catch (error) {
    return null
  }
};

export default getUserDataDB;
