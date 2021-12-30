import { Container, CssBaseline } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import { RequireAnon, RequireAuth } from "./guards";
import UserProvider from "./providers/UserProvider";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   height: 100vh;
//   width: 100vw;
//   color: white;
// `;

const MainContainer = styled.div`
  height: 100vh;
`;

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: indigo[600],
    },
    background: {
      default: grey[900],
      paper: grey[900],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Container component="main" sx={{ padding: 0 }}>
          <CssBaseline />
          <BrowserRouter>
            <MainContainer>
              <Routes>
                <Route
                  exact
                  path="/signin"
                  element={
                    <RequireAnon>
                      <SignIn />
                    </RequireAnon>
                  }
                />
                <Route
                  exact
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />
                <Route exact path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </MainContainer>
          </BrowserRouter>
        </Container>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
