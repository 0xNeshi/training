import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

const usersCollection = "users";

export const exists = async (userEmail) => {
  const snapshot = await getDoc(doc(db, usersCollection, userEmail));

  return snapshot.exists();
};
