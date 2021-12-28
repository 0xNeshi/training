import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider";
import { signInWithGoogle, signOut } from "../services/authService";
import { exists } from "../services/userService";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Error = styled.span`
  color: red;
  width: 100%;
  text-align: center;
`;

const SignIn = () => {
  const { error } = useContext(UserContext);

  return (
    <Container>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      {error && <Error>{error}</Error>}
    </Container>
  );
};

export default SignIn;
