import { auth } from "../credentials";
import { signOut } from "@firebase/auth";

const logOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error(error);
    }
};

export default logOut;