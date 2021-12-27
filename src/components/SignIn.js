import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import signInWithGoogle from "../services/authService";
import { UserContext } from "../providers/UserProvider";
import { Navigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignIn = () => {
  const user = useContext(UserContext);
  const [redirect, setRedirect] = useState();

  useEffect(() => {
    if (user) {
      setRedirect("/dashboard");
    }
  }, [user]);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <Container>
      <button className="button" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </Container>
  );
};

export default SignIn;
