import { db, mainCollection } from "../credentials";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const getUserDataDB = async (userId) => {
  try {
    const docRef = doc(db, mainCollection, userId);
    const collectionExpRef = collection(db, "HomeTest", userId, "experiencies");
    const querySnaps = await getDocs(collectionExpRef);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      
      const arrExp = [];

      querySnaps.docs.forEach((doc) => arrExp.push({ ...doc.data() }));

      return {...docSnap.data(), experiencies: arrExp}
    } else {
      // doc.data() will be undefined in this case
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default getUserDataDB;
