import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import ExercisePicker from "./components/ExercisePicker";
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
            <Route path="/" element={<ExercisePicker />} />
            <Route exact path="/dashboard/:exercise" element={<Dashboard />} />
          </Routes>
        </MainContainer>
        <Footer />
      </BrowserRouter>
    </Container>
  );
}

export default App;
