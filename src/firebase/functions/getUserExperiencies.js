import { db, mainCollection, experiencieCollection } from "../credentials";
import { collection, getDocs } from "firebase/firestore";

const getUserExperiencies = async (userId) => {
  try {
    const collectionRef = collection(db, "HomeTest", userId, "experiencies");
    const querySnaps = await getDocs(collectionRef);
    
    const arrExp = [];

    if (querySnaps.docs.length === 0) {return arrExp}

    querySnaps.docs.forEach((doc) => arrExp.push({...doc.data()}))

    return arrExp
    
  } catch (error) {
    console.log("error :", error);
  }
};

export default getUserExperiencies;
