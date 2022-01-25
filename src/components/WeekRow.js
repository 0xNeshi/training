import React, { useMemo } from "react";
import styled from "styled-components";
import ExerciseRow from "./ExerciseRow";

export default function WeekRow({ changeAmrapReps, week, blockId }) {
  const exerciseRows = useMemo(
    () =>
      exercisesInOrder.map((exName) => {
        const exercise = week.exercises.find((x) => x.name === exName);
        const weights = getWeights(exercise.trainingMax, week.number);

        return (
          <ExerciseRow
            key={`${blockId}${week.number}${exercise.name}`}
            weights={weights}
            changeAmrapReps={(newAmrapReps) =>
              changeAmrapReps(week.number, exercise.name, newAmrapReps)
            }
            amrapReps={exercise.amrapReps}
            exerciseName={exercise.name}
            trainingMax={exercise.trainingMax}
          />
        );
      }),
    [week, blockId, changeAmrapReps]
  );

  const [first, second, third] = useMemo(
    () => getPercentages(week.number),
    [week]
  );

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

const fractionToPercentage = (fraction) => `${fraction * 100}%`;

const getWeights = (trainingMax, weekNumber) => {
  const weights = percentagesPerWeek[weekNumber].map((percentage) =>
    calculate(trainingMax, percentage)
  );

  return weights;
};

const calculate = (weight, percent) => {
  const exactWeight = weight * percent;
  const mod = exactWeight % 2.5;
  return exactWeight - mod;
};

const getPercentages = (weekNumber) => percentagesPerWeek[weekNumber];

const repSchemas = {
  1: "5/5/5",
  2: "3/3/3",
  3: "5/3/1",
};

const exercisesInOrder = ["overhead", "deadlift", "bench", "squat"];

const percentagesPerWeek = {
  1: [0.65, 0.75, 0.85],
  2: [0.7, 0.8, 0.9],
  3: [0.75, 0.85, 0.95],
};
