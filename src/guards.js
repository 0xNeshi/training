import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./providers/UserProvider";

function RequireAuth({ children }) {
  const user = useContext(UserContext);

  return !!user ? children : <Navigate to="/signin" />;
}

function RequireAnon({ children }) {
  const user = useContext(UserContext);

  return !user ? children : <Navigate to="/dashboard" />;
}

export { RequireAuth, RequireAnon };
