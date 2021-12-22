import { useEffect, useState, useCallback } from "react";
import { mockBlocks, mockNewBlocks } from "./data";

let blockStats = mockBlocks;
let newBlocks = mockNewBlocks;

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

export const deleteBlock = (exercise, blockId) => {
  const newBlocks = blockStats.filter(
    (x) => x.exercise !== exercise || x.id !== blockId
  );

  blockStats = newBlocks;
};
