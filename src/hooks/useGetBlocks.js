import { useEffect, useState } from "react";

const blockStats = [
  {
    number: 1,
    exercise: "squat",
    trainingMax: 75,
  },
  {
    number: 2,
    exercise: "squat",
    trainingMax: 80,
  },
  {
    number: 3,
    exercise: "squat",
    trainingMax: 85,
  },
  {
    number: 4,
    exercise: "squat",
    trainingMax: 90,
  },
];

export const useGetBlocks = (exercise) => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const newBlocks = blockStats.filter(
      (x) => x.exercise.toLowerCase() === exercise.toLowerCase()
    );

    setBlocks(newBlocks);
    setLoading(false);
  }, [exercise]);

  return { isLoading, blocks };
};
