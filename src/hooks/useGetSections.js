import { useCallback, useEffect, useState } from "react";
import { getSections } from "../services/sectionService";

export const useGetSections = () => {
  const [sections, setSections] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const refresh = useCallback(() => {
    setToggleRefresh((prevState) => !prevState);
  }, []);

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
  };
};
