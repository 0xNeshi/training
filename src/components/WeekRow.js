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
  text-align: left;
`;

const repSchemas = {
  1: "5/5/5",
  2: "3/3/3",
  3: "5/3/1",
};

function WeekRow({ changeAmrap, week, blockId }) {
  const exerciseRows = week.exercises.map((ex) => {
    const weights = getWeights(ex.trainingMax, week.number);

    return (
      <ExerciseRow
        key={`${blockId}${week.number}${ex.name}`}
        weights={weights}
        changeAmrap={changeAmrap}
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
        Week {week.number} ({repSchemas[week.number]})
      </span>
      <Table>
        <th>Name</th>
        <th>TM</th>
        <th>{fractionToPercentage(first)}</th>
        <th>{fractionToPercentage(second)}</th>
        <th>{fractionToPercentage(third)}</th>
        <th style={{ textAlign: "center" }}>+</th>

        {exerciseRows}
      </Table>
    </Container>
  );
}

export default WeekRow;

const fractionToPercentage = (fraction) => `${fraction * 100}%`;
