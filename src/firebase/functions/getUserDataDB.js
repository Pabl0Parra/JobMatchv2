import { db, mainCollection } from "../credentials";
import { collection, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore";

const getUserDataDB = async (userId) => {
  try {
    const docRef = doc(db, mainCollection, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      
      const collectionExpRef = collection(db, "HomeTest", userId, "experiences");
     /*  const queryExp = query(collectionExpRef, orderBy("timestamp", "des")) */
      const querySnaps = await getDocs(collectionExpRef);

      const arrExp = [];

      querySnaps.docs.forEach((doc) => arrExp.push({ ...doc.data() }));

      return {...docSnap.data(), experiences: arrExp}
    } else {
      // doc.data() will be undefined in this case
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default getUserDataDB;
