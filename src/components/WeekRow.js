import React from "react";
import styled from "styled-components";
import { getWeights } from "../hooks/useGetWeights";
import ExerciseRow from "./ExerciseRow";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  font-size: 1.2em;
`;

const Text = styled.span`
  flex-grow: 1;
  text-decoration: underline;
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
      />
    );
  });

  return (
    <Container>
      <Text>
        Week {week.number} ({repSchemas[week.number]})
      </Text>
      {exerciseRows}
    </Container>
  );
}

export default WeekRow;
