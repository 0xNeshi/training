import React from "react";
import styled from "styled-components";
import Button from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  min-height: 100%;
`;

function ExercisePicker() {
  return (
    <Container>
      <Button text="Squat" exercise="squat" />
      <Button text="Deadlift" exercise="deadlift" />
      <Button text="Bench" exercise="bench" />
      <Button text="Overhead Press" exercise="overhead" />
    </Container>
  );
}

export default ExercisePicker;
