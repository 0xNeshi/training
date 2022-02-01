import { useCallback, useEffect, useState } from "react";
import { getSections } from "../services/sectionService";

export default function useGetSections(userEmail) {
  const [sections, setSections] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [toggleRefresh, setToggleRefresh] = useState(false);

  const refresh = useCallback(() => {
    setToggleRefresh((prevState) => !prevState);
  }, []);

  const getData = useCallback(async () => {
    setLoading(true);
    const newSections = await getSections(userEmail);
    const sortedSections = newSections.sort(
      (b1, b2) => b2.dateCreated - b1.dateCreated
    );
    setSections(sortedSections);
    setLoading(false);
  }, [userEmail]);

  useEffect(() => getData(), [toggleRefresh, getData]);

  return {
    isLoading,
    sections,
    refresh,
  };
}
