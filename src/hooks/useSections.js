import { useCallback, useEffect, useMemo, useState } from "react";
import { getSections } from "../services/sectionService";
import usePersistentState from "./usePersistentState";

export default function useSections(userEmail) {
  const key = useMemo(() => `sections-${userEmail}`, [userEmail]);
  const [sections, setSections] = usePersistentState(key, []);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      const backupSections = await getSections(userEmail);
      setSections(backupSections);
      setLoading(false);
    }

    if (!sections?.length) {
      fetch();
      return;
    }
    // this should run only the first time the user opens the app
    // eslint-disable-next-line
  }, [userEmail]);

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
