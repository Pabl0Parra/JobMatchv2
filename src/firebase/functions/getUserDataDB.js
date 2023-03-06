import { db, mainCollection } from "../credentials";
import { collection, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore";

const getUserDataDB = async (userId) => {
  try {
    const docRef = doc(db, mainCollection, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      
      const collectionRef = collection(db, "HomeTest", userId, docSnap.data().worker? "experiences" : "posts");
     /*  const queryExp = query(collectionExpRef, orderBy("timestamp", "des")) */
      const querySnaps = await getDocs(collectionRef);

      const arr = [];

      querySnaps.docs.forEach((doc) => arr.push({ ...doc.data() }));

      return {...docSnap.data(), [`${docSnap.data().worker? "experiences" : "posts"}`] : arr}
    } else {
      // doc.data() will be undefined in this case
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default getUserDataDB;
