import { collection, doc , deleteDoc } from "@firebase/firestore";
import { db } from "../credentials";

const deleteExperienceOrPost = async (userId, experienceId, worker) => {
    
    try {
        const deletExp = doc(collection(db, "HomeTest", userId, worker? "experiences" : "posts"), experienceId);
    
        await deleteDoc(deletExp);
    
        return true
    
      } catch (error) {
        console.log(error);
      }

};

export default deleteExperienceOrPost;