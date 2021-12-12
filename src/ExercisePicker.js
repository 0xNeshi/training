import React from "react";
import Button from "./Button";
import Container from "./Container";

function ExercisePicker(props) {
  return (
    <Container>
      <Button
        text="Squat"
        onButtonClicked={() => props.onChangeExercise("squat")}
      />
      <Button
        text="Deadlift"
        onButtonClicked={() => props.onChangeExercise("deadlift")}
      />
      <Button
        text="Bench"
        onButtonClicked={() => props.onChangeExercise("bench")}
      />
      <Button
        text="Overhead Press"
        onButtonClicked={() => props.onChangeExercise("overhead")}
      />
    </Container>
  );
}

export default ExercisePicker;
