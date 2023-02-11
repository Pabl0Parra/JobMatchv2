import { auth } from '../credentials'
import { fetchSignInMethodsForEmail } from '@firebase/auth';

const checkRegisteredEmail = async (email) => {
    try {
        const res = await fetchSignInMethodsForEmail(auth, email);
        return (res.length !== 0);
    } catch (error) {
        return console.log(error);
    }
};

export default checkRegisteredEmail;