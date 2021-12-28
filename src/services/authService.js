import { signInWithPopup, signOut as _signOut } from "firebase/auth";
import { auth, googleProvider } from "../config/firebase";

const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

const signOut = () =>
  _signOut(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch((error) => {
      console.log(error);
    });

export { signInWithGoogle, signOut };
