import { signInWithPopup, signOut as _signOut } from "firebase/auth";
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

const signOut = () => {
  _signOut(auth)
    .then(() => {
      console.log("Logged out");
    })
    .catch((error) => {
      console.log(error);
    });
};

export { signInWithGoogle, signOut };
