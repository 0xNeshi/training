import React from "react";
import styled from "styled-components";
import { getPercentages, getWeights } from "../hooks/useGetWeights";
import ExerciseRow from "./ExerciseRow";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 230px;
`;

const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.9rem;
  text-align: center;
`;

const HeaderCell = styled.td`
  border-left: 1px solid white;
  font-weight: bold;
`;

const HeaderNameCell = styled(HeaderCell)`
  border-left: none;
  text-align: left;
`;

const AmrapHeaderCell = styled(HeaderCell)`
  text-align: center;
  border-left: none;
`;

const repSchemas = {
  1: "5/5/5",
  2: "3/3/3",
  3: "5/3/1",
};

function WeekRow({ changeAmrapReps, week, blockId }) {
  const exerciseRows = week.exercises.map((ex) => {
    const weights = getWeights(ex.trainingMax, week.number);

    return (
      <ExerciseRow
        key={`${blockId}${week.number}${ex.name}`}
        weights={weights}
        changeAmrapReps={(newAmrapReps) =>
          changeAmrapReps(week.number, ex.name, newAmrapReps)
        }
        amrapReps={ex.amrapReps}
        exerciseName={ex.name}
        trainingMax={ex.trainingMax}
      />
    );
  });

  const [first, second, third] = getPercentages(week.number);

  return (
    <Container>
      <span>
        Week {week.number} (<u>{repSchemas[week.number]}</u>)
      </span>
      <Table>
        <thead>
          <tr>
            <HeaderNameCell>Name</HeaderNameCell>
            <HeaderCell>TM</HeaderCell>
            <HeaderCell>{fractionToPercentage(first)}</HeaderCell>
            <HeaderCell>{fractionToPercentage(second)}</HeaderCell>
            <HeaderCell>{fractionToPercentage(third)}</HeaderCell>
            <AmrapHeaderCell>+</AmrapHeaderCell>
          </tr>
        </thead>
        <tbody>{exerciseRows}</tbody>
      </Table>
    </Container>
  );
}

export default WeekRow;

const fractionToPercentage = (fraction) => `${fraction * 100}%`;
