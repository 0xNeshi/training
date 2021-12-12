import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Dashboard from "./Dashboard";
import ExercisePicker from "./ExercisePicker";
import Navbar from "./Navbar";

const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContainer = styled.div`
  height: 70vh;
`;

function App() {
  const [exercise, setExercise] = useState("squat");

  const handleChange = (exercise) => {
    setExercise(exercise);
  };

  return (
    <Container>
      <BrowserRouter>
        <Navbar />
        <MainContainer>
          <Routes>
            <Route
              path="/"
              element={<ExercisePicker onChangeExercise={handleChange} />}
            />
            <Route exact path="/dashboard/:exercise" element={<Dashboard />} />
          </Routes>
        </MainContainer>
      </BrowserRouter>
    </Container>
  );
}

export default App;
