import React from "react";
import styled from "styled-components";
import { AmrapInput } from "./AmrapInput";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.2em;
  height: 70px;
`;

const Text = styled.span`
  flex-grow: 1;
`;

const Weights = styled.span`
  flex-grow: 3;
  font-style: italic;
  width: 100px;
`;

function ExerciseRow({ exerciseName, weights, amrapReps, changeAmrap }) {
  const [first, second, third] = weights;

  return (
    <Container>
      <Text>{exerciseName}</Text>
      <Weights>
        {first} , {second} , {third}
      </Weights>
      <Text>+</Text>
      <AmrapInput reps={amrapReps} onChangeAmrap={changeAmrap} />;
    </Container>
  );
}

export default ExerciseRow;
