import { Container, CssBaseline } from "@mui/material";
import { grey, lightGreen } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import { RequireAnon, RequireAuth } from "./guards";
import { ModalProvider, UserProvider } from "./providers";

const Dashboard = lazy(() => import("./components/Dashboard"));
const SignIn = lazy(() => import("./components/SignIn"));

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ModalProvider>
          <Container component="main" sx={{ padding: 0 }}>
            <CssBaseline />
            <Suspense fallback={<Loading />}>
              <BrowserRouter>
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
                  <Route
                    exact
                    path="/"
                    element={<Navigate to="/dashboard" />}
                  />
                </Routes>
              </BrowserRouter>
            </Suspense>
          </Container>
        </ModalProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: lightGreen[900],
    },
    secondary: {
      main: grey[800],
    },
    warning: {
      main: grey[300],
    },
    background: {
      default: grey[900],
      paper: grey[900],
    },
  },
});
