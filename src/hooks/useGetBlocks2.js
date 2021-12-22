import { useEffect, useState, useCallback } from "react";
import { mockNewBlocks } from "./data";

let mockBlocks = mockNewBlocks;

export const useGetBlocks2 = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const refresh = useCallback(() => {
    setToggleRefresh((prevState) => !prevState);
  }, []);

  useEffect(() => {
    setLoading(true);
    setBlocks(mockBlocks);
    setLoading(false);
  }, [toggleRefresh]);

  return { isLoading, blocks, refresh };
};

export const updateAmrapReps = (exercise, blockId, amrapReps, weekNumber) => {
  const block = mockBlocks.find((x) => x.id === blockId);
  const exercise = block.exercises.find((e) => e.name === exercise);
  const week = exercise.weeks.find((week) => week.number === weekNumber);
  week.amrapReps = amrapReps;
};

export const deleteBlock = (blockId) => {
  mockBlocks = mockBlocks.filter((x) => x.id !== blockId);
};
