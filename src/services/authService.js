import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log(result.user);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default signInWithGoogle;
