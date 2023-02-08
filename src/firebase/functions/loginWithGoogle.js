import { auth } from "../credentials";
import { GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";

const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    } catch (error) {
        console.log(error);
    }
};

export default loginWithGoogle;