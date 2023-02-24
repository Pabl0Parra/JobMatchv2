import { db } from "../credentials";
import { doc, updateDoc } from "firebase/firestore";

const changeURLProfilePictureDB = async (idUser, urlPicture) => {
  try {
    const docRef = doc(db, "HomeTest", idUser);
    return await updateDoc(docRef, {
      image: urlPicture,
    });
  } catch (error) {
    console.log("error: ", error);
  }
};

export default changeURLProfilePictureDB;
