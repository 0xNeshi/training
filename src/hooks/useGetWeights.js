import { useMemo } from "react";

const weightPercentages = [0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95];

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
