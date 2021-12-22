import { useEffect, useState, useCallback } from "react";
import { mockBlocks } from "./data";

export const useGetBlocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const refresh = useCallback(() => {
    setToggleRefresh((prevState) => !prevState);
  }, []);

  const newBlocks = mockBlocks.sort(
    (b1, b2) => b2.dateCreated - b1.dateCreated
  );
  useEffect(() => {
    setLoading(true);
    setBlocks(newBlocks);
    setLoading(false);
  }, [toggleRefresh]);

  return { isLoading, blocks, refresh };
};

export const updateAmrapReps = (
  blockId,
  exerciseName,
  amrapReps,
  weekNumber
) => {
  const block = mockBlocks.find((x) => x.id === blockId);
  const exercise = block.exercises.find((e) => e.name === exerciseName);
  const week = exercise.weeks.find((week) => week.number === weekNumber);
  week.amrapReps = amrapReps;
};

export const deleteBlock = (blockId) => {
  mockBlocks = mockBlocks.filter((x) => x.id !== blockId);
};
