import { useEffect, useState, useCallback } from "react";
import { mockBlocks } from "./data";

export const useGetBlocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const refresh = useCallback(() => {
    setToggleRefresh((prevState) => !prevState);
  }, []);

  const updateAmrapReps = (blockId, weekNumber, exerciseName, amrapReps) => {
    const updatedBlocks = [...blocks];
    const block = updatedBlocks.find((x) => x.id === blockId);
    const week = block.weeks.find((week) => week.number === weekNumber);
    const exercise = week.exercises.find((e) => e.name === exerciseName);
    exercise.amrapReps = amrapReps;

    setBlocks(updatedBlocks);
  };

  const deleteBlock = (blockId) => {
    setBlocks((prevBlocks) => prevBlocks.filter((x) => x.id !== blockId));
  };

  useEffect(() => {
    setLoading(true);
    setBlocks(mockBlocks);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    setBlocks((prev) => prev.sort((b1, b2) => b2.dateCreated - b1.dateCreated));
    setLoading(false);
  }, [toggleRefresh]);

  return { isLoading, blocks, refresh, updateAmrapReps, deleteBlock };
};
