import React from "react";
import Button from "./Button";
import Container from "./Container";

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
