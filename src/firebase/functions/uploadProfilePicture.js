import { storage } from "../credentials";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadProfilePicture = async (imageUri, name) => {
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

export default uploadProfilePicture;
