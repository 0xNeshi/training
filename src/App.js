import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import ExercisePicker from "./components/ExercisePicker";
import Navbar from "./components/Navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #282c34;
`;

const MainContainer = styled.div`
  height: 80vh;
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
      </BrowserRouter>
    </Container>
  );
}

export default App;
