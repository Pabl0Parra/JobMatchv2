import { auth } from "../credentials";
import { signInWithEmailAndPassword } from "@firebase/auth";

const loginWithEmailPassword = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        return user;
    } catch (error) {
        return undefined;
    }
};

export default loginWithEmailPassword;