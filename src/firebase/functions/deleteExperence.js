import { collection, doc , deleteDoc } from "@firebase/firestore";
import { db } from "../credentials";

const deleteExperence = async (userId, experienceId) => {
    
    try {
        const deletExp = doc(collection(db, "HomeTest", userId, "experiences"), experienceId);
    
        await deleteDoc(deletExp);
    
        return true
    
      } catch (error) {
        console.log(error);
      }

};

export default deleteExperence;