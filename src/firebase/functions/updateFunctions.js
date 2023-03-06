import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, mainCollection, storage } from "../credentials";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const updateFisrTime = async (id) => {
  await updateDoc(doc(db, mainCollection, id), {
    firstTime: false,
  });
};

export const updateDataUser = async (obj, userId) => {
    
  try {
    const collectionRef = collection(db, mainCollection)
    const userDoc = doc(collectionRef, userId)

    await updateDoc(userDoc, obj);

    return true

  } catch (error) {
    console.log(error)
  }

};

export const updateVisits= async(id)=> {

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

export const uploadProfilePicture = async (imageUri, name) => {
  try {
    const response = await fetch(imageUri);
    const blobFile = await response.blob();

    const reference = ref(storage, `profilePictures/${name}.jpg`);
    const result = await uploadBytes(reference, blobFile);
    const url = await getDownloadURL(result.ref);

    return url;
  } catch (error) {
    console.error(error);
  }
};

export const updateExperienceOrPost = async (obj, userId, idExperience, worker) => {
    
  try {
    const newExp = doc(collection(db, mainCollection, userId, worker? "experiences" : "posts"), idExperience);
   /*  const expToCollection = doc(collection(db, "Experiences"), idExperience);  */

    await updateDoc(newExp, obj);
   /*  await updateDoc(expToCollection, obj); */

    return true

  } catch (error) {
    console.log(error);
  }

};
