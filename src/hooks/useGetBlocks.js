import { useEffect, useState, useCallback } from "react";

const blockStats = [
  {
    id: 1,
    number: 1,
    exercise: "squat",
    trainingMax: 75,
    dateCreated: Date.now() - 3000,
    weeks: [
      { number: 1, amrapReps: 10 },
      { number: 2, amrapReps: 7 },
      { number: 3, amrapReps: 6 },
    ],
  },
  {
    id: 2,
    number: 2,
    exercise: "squat",
    trainingMax: 80,
    dateCreated: Date.now() - 2000,
    weeks: [
      { number: 1, amrapReps: 10 },
      { number: 2, amrapReps: 7 },
      { number: 3, amrapReps: 6 },
    ],
  },
  {
    id: 3,
    number: 3,
    exercise: "squat",
    trainingMax: 85,
    dateCreated: Date.now() - 1000,
    weeks: [
      { number: 1, amrapReps: 10 },
      { number: 2, amrapReps: 7 },
      { number: 3, amrapReps: 6 },
    ],
  },
  {
    id: 4,
    number: 4,
    exercise: "squat",
    trainingMax: 90,
    dateCreated: Date.now(),
    weeks: [
      { number: 1, amrapReps: 10 },
      { number: 2, amrapReps: 7 },
      { number: 3, amrapReps: 0 },
    ],
  },
];

export const useGetBlocks = (exercise) => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const refresh = useCallback(() => {
    setToggleRefresh((prevState) => !prevState);
  }, []);

  useEffect(() => {
    setLoading(true);

    const newBlocks = blockStats.filter(
      (x) => x.exercise.toLowerCase() === exercise.toLowerCase()
    );

    setBlocks(newBlocks);
    setLoading(false);
  }, [exercise, toggleRefresh]);

  return { isLoading, blocks, refresh };
};

export const updateAmrapReps = (exercise, blockId, amrapReps, weekNumber) => {
  const block = blockStats.find(
    (x) => x.exercise === exercise && x.id === blockId
  );
  const week = block.weeks.find((week) => week.number === weekNumber);
  week.amrapReps = amrapReps;
};
