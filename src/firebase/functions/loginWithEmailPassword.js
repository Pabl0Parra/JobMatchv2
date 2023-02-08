import { auth } from "../credentials";
import { signInWithEmailAndPassword } from "@firebase/auth";

const loginWithEmailPassword = async (email, password) => {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
    } catch (error) {
        console.log(error);
    }
};

export default loginWithEmailPassword;