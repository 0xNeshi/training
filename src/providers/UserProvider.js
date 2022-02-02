import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

const UserContext = createContext({ user: null, error: null });

function UserProvider(props) {
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUser(null);
        return;
      }

      const userExists = await exists(user.email);
      if (userExists) {
        setUser(user);
        setError("");
      } else {
        setError("User not found");
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, error }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider;
export { UserContext };

async function exists(userEmail) {
  const snapshot = await getDoc(doc(db, "users", userEmail));

  return snapshot.exists();
}
