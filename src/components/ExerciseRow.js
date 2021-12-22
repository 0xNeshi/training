import React from "react";
import styled from "styled-components";
import { AmrapInput } from "./AmrapInput";

const Cell = styled.td`
  border-bottom: 1px solid white;
  border-left: 1px solid white;
  font-size: 0.9rem;
`;

const AmrapCell = styled(Cell)`
  text-align: center;
  border-left: none;
`;

const NameCell = styled(Cell)`
  border-left: none;
`;

function ExerciseRow({
  exerciseName,
  weights,
  trainingMax,
  amrapReps,
  changeAmrap,
}) {
  const [first, second, third] = weights;

  return (
    <tr>
      <NameCell>{exerciseName}</NameCell>
      <Cell>{trainingMax}</Cell>
      <Cell>{first}</Cell>
      <Cell>{second}</Cell>
      <Cell>{third}</Cell>
      <AmrapCell>
        <AmrapInput reps={amrapReps} onChangeAmrap={changeAmrap} />
      </AmrapCell>
    </tr>
  );
}

export default ExerciseRow;
