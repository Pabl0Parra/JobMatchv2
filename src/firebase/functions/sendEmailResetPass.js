import { auth } from "../credentials";
import { sendPasswordResetEmail } from "@firebase/auth";

const sendEmailResetPass = async (email) => {
    try {
        const res = await sendPasswordResetEmail(auth, email);
        console.log(res);
    } catch (error) {
        console.log("no se pudo mandar el email");
    }
};

export default sendEmailResetPass;