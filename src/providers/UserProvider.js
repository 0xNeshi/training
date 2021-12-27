import React, { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

const UserContext = createContext({ user: null });

function UserProvider(props) {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export default UserProvider;
export { UserContext };
