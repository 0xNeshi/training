import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";

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
    <Container>
      <BrowserRouter>
        <MainContainer>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </MainContainer>
      </BrowserRouter>
    </Container>
  );
}

export default App;
