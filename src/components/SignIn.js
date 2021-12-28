import styled from "styled-components";
import { signInWithGoogle } from "../services/authService";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SignIn = () => {
  return (
    <Container>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </Container>
  );
};

export default SignIn;
