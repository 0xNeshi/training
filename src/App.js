import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import SignIn from "./components/SignIn";
import UserProvider from "./providers/UserProvider";
import { RequireAnon, RequireAuth } from "./guards";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #343028;
  color: white;
`;

const MainContainer = styled.div`
  height: 100vh;
`;

function App() {
  return (
    <UserProvider>
      <Container>
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
            </Routes>
          </MainContainer>
        </BrowserRouter>
      </Container>
    </UserProvider>
  );
}

export default App;
