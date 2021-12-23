import { useEffect, useState, useCallback } from "react";
import { getSections, deleteSection, updateSection } from "../sectionService";

export const useGetSections = () => {
  const [sections, setSections] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const refresh = useCallback(() => {
    setToggleRefresh((prevState) => !prevState);
  }, []);

  const updateAmrapReps = (sectionId, weekNumber, exerciseName, amrapReps) => {
    const tempSection = sections.find((x) => x.id === sectionId);
    const section = { ...tempSection };
    const week = section.weeks.find((week) => week.number === weekNumber);
    const exercise = week.exercises.find((e) => e.name === exerciseName);
    exercise.amrapReps = amrapReps;

    updateSection(sectionId, section);
  };

  const deleteSectionById = (sectionId) => {
    deleteSection(sectionId);
  };

  useEffect(() => {
    setLoading(true);
    const newSections = getSections().sort(
      (b1, b2) => b2.dateCreated - b1.dateCreated
    );
    setSections(newSections);
    setLoading(false);
  }, [toggleRefresh]);

  return {
    isLoading,
    sections: sections,
    refresh,
    updateAmrapReps,
    deleteSectionById,
  };
};
