import { useCallback, useEffect, useState } from "react";
import { getSections } from "../services/sectionService";

export const useGetSections = (userEmail) => {
  const [sections, setSections] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const refresh = useCallback(() => {
    setToggleRefresh((prevState) => !prevState);
  }, []);

  useEffect(() => {
    setLoading(true);
    getSections(userEmail)
      .then((data) => {
        const newSections = data.sort(
          (b1, b2) => b2.dateCreated - b1.dateCreated
        );
        setSections(newSections);
      })
      .finally(() => setLoading(false));
  }, [toggleRefresh]);

  return {
    isLoading,
    sections: sections,
    refresh,
  };
};
