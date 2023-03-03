import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, mainCollection } from "../credentials";

const updateVisits= async(id)=> {

  const docRef = doc(db, mainCollection, id)
  const docSnap = await getDoc(docRef)
    
      if(docSnap.id === id){
        const data = docSnap.data();
        const contador = data.visits || 0;
        updateDoc(doc(db, mainCollection, id), {
          visits: contador + 1,
        })
      }
  return
}

export default updateVisits