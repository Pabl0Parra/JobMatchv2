import { auth } from "../credentials";
import { GoogleAuthProvider, signInWithRedirect, browserPopupRedirectResolver } from "@firebase/auth";

const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        await signInWithRedirect(auth, provider, browserPopupRedirectResolver);
    } catch (error) {
        console.log(error);
    }
};

export default loginWithGoogle;