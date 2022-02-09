import { Fade } from "@mui/material";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Google from "../assets/images/google.png";
import FithOnLogo from "../assets/images/fithon-logo.png";
import { UserContext } from "../providers";
import { signInWithGoogle } from "../services/authService";

export default function SignIn() {
  const { error } = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const [canSignIn, setCanSignIn] = useState(false);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => setLoading(false), 2000);
    const signInTimeout = setTimeout(() => setCanSignIn(true), 3000);
    return () => {
      clearTimeout(loadingTimeout);
      clearTimeout(signInTimeout);
    };
  }, []);

  return (
    <Container>
      <Fade in={isLoading} unmountOnExit>
        <img src={FithOnLogo} alt="" style={{ width: "80%" }} />
      </Fade>
      <Fade in={canSignIn} unmountOnExit>
        <div>
          <h3 style={{ textAlign: "center" }}>Let's get started...</h3>
          <Button
            variant="contained"
            onClick={signInWithGoogle}
            sx={{ backgroundColor: blue[800], paddingLeft: 1 }}
          >
            <ButtonIcon src={Google} alt="" />
            Connect with Google
          </Button>
          {error && <Error>{error}</Error>}
        </div>
      </Fade>
    </Container>
  );
}

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

const ButtonIcon = styled.img`
  padding: 10px;
  width: 50px;
  height: 100%;
  margin-right: 15px;
  background-color: white;
  border-radius: 3px;
`;
