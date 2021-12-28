import React, { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { exists } from "../services/userService";

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
