import { useCallback } from "react";
import useSyncSections from "./useSyncSections";

export default function useSections(userEmail) {
  const { state, isLoading } = useSyncSections(userEmail);
  const [sections, setSections] = state;

  const add = useCallback(
    (section) => {
      const newSections = [...sections];
      newSections.push(section);
      setSections(newSections);
    },
    [sections, setSections]
  );

  const remove = useCallback(
    (sectionId) => {
      const newSections = [...sections].filter((x) => x.id !== sectionId);
      setSections(newSections);
    },
    [sections, setSections]
  );

  const update = useCallback(
    (section) => {
      const newSections = [...sections].filter((x) => x.id !== section.id);
      newSections.push(section);
      setSections(newSections);
    },
    [sections, setSections]
  );

  return {
    sections,
    add,
    remove,
    update,
    isLoading,
  };
}
