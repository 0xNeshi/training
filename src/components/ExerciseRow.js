import React from "react";
import styled from "styled-components";
import { AmrapInput } from "./AmrapInput";

const Cell = styled.td`
  border-left: 1px solid white;
`;

const AmrapCell = styled(Cell)`
  border-left: none;
`;

const TMCell = styled(Cell)`
  font-weight: 600;
`;

const NameCell = styled(Cell)`
  border-left: none;
  text-align: left;
`;

export default function ExerciseRow({
  exerciseName,
  weights,
  trainingMax,
  amrapReps,
  changeAmrapReps,
}) {
  const [first, second, third] = weights;

  return (
    <tr>
      <NameCell>{exerciseName}</NameCell>
      <TMCell>{trainingMax}</TMCell>
      <Cell>{first}</Cell>
      <Cell>{second}</Cell>
      <Cell>{third}</Cell>
      <AmrapCell>
        <AmrapInput reps={amrapReps} onChangeAmrapReps={changeAmrapReps} />
      </AmrapCell>
    </tr>
  );
}
