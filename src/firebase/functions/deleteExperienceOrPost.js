import { collection, doc , deleteDoc } from "@firebase/firestore";
import { db, mainCollection } from "../credentials";

const deleteExperienceOrPost = async (userId, experienceId, worker) => {
    
    try {
        const deletExp = doc(collection(db, mainCollection, userId, worker? "experiences" : "posts"), experienceId);
    
        await deleteDoc(deletExp);
    
        return true
    
      } catch (error) {
        console.log(error);
      }

};

export default deleteExperienceOrPost;