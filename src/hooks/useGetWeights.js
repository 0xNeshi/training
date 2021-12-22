import { useMemo } from "react";

const weightPercentages = [0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95];

const percentagesPerWeek = {
  1: [0.65, 0.75, 0.85],
  2: [0.7, 0.8, 0.9],
  3: [0.75, 0.85, 0.95],
};

const calculate = (weight, percent) => {
  const exactWeight = weight * percent;
  const mod = exactWeight % 2.5;
  return exactWeight - mod;
};

export const useGetWeights = (trainingMax) => {
  const weights = useMemo(
    () =>
      weightPercentages.map((percentage) => calculate(trainingMax, percentage)),
    [trainingMax]
  );

  return weights;
};

export const getWeights = (trainingMax, weekNumber) => {
  const weights = percentagesPerWeek[weekNumber].map((percentage) =>
    calculate(trainingMax, percentage)
  );

  return weights;
};

export const getPercentages = (weekNumber) => percentagesPerWeek[weekNumber];
