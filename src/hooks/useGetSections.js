import { useEffect, useState, useCallback } from "react";
import { mockSections } from "../data";

export const useGetSections = () => {
  const [sections, setSections] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const refresh = useCallback(() => {
    setToggleRefresh((prevState) => !prevState);
  }, []);

  const updateAmrapReps = (sectionId, weekNumber, exerciseName, amrapReps) => {
    const updatedSections = [...sections];
    const section = updatedSections.find((x) => x.id === sectionId);
    const week = section.weeks.find((week) => week.number === weekNumber);
    const exercise = week.exercises.find((e) => e.name === exerciseName);
    exercise.amrapReps = amrapReps;

    setSections(updatedSections);
  };

  const deleteSection = (sectionId) => {
    setSections((prevSections) =>
      prevSections.filter((x) => x.id !== sectionId)
    );
  };

  useEffect(() => {
    setLoading(true);
    setSections(mockSections);
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    setSections((prev) =>
      prev.sort((b1, b2) => b2.dateCreated - b1.dateCreated)
    );
    setLoading(false);
  }, [toggleRefresh]);

  return {
    isLoading,
    sections: sections,
    refresh,
    updateAmrapReps,
    deleteSection,
  };
};
