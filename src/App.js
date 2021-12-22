import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #343028;
  color: white;
`;

const MainContainer = styled.div`
  height: 90vh;
`;

function App() {
  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <MainContainer>
          <Routes>
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </MainContainer>
        <Footer />
      </BrowserRouter>
    </Container>
  );
}

export default App;
