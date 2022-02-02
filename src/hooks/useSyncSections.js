import { useCallback, useEffect, useMemo, useState } from "react";
import { getSectionsFromBackup, pushBackup } from "../utilities";
import usePersistentState from "./usePersistentState";

// 1000 ms * 60 secs * 60 mins * 24 hours = 86400000 ms
const DAY_DURATION = 86400000;

export default function useSyncSections(userEmail) {
  const sectionsKey = useMemo(() => `sections-${userEmail}`, [userEmail]);
  const lastBackupKey = useMemo(() => `lastbackup-${userEmail}`, [userEmail]);
  const [sections, setSections] = usePersistentState(sectionsKey, []);
  const [isLoading, setLoading] = useState(false);

  const fetch = useCallback(async () => {
    if (!window.navigator.onLine) {
      alert("Please check your internet connection");
      return;
    }

    setLoading(true);
    try {
      const backupSections = await getSectionsFromBackup(userEmail);
      setSections(backupSections);
      localStorage.setItem(lastBackupKey, Date.now());
    } catch (error) {
      alert("Error getting data, please try again later");
      console.log(error);
    }
    setLoading(false);
  }, [userEmail, setSections, lastBackupKey]);

  const backup = useCallback(async () => {
    if (!window.navigator.onLine) {
      console.log("Couldn't backup, no internet");
      return;
    }
    try {
      const backup = createBackupObject(userEmail, sections);
      await pushBackup(backup);
      localStorage.setItem(lastBackupKey, backup.lastBackupTime);
    } catch (e) {
      console.log("There was an error, stopping backup\n", e);
    }
  }, [userEmail, sections, lastBackupKey]);

  useEffect(() => {
    if (!sections?.length) {
      fetch();
      return;
    }

    if (shouldBackup(lastBackupKey)) {
      backup();
    }
    // this should run only the first time the user opens the app
    // eslint-disable-next-line
  }, []);

  return {
    isLoading,
    state: [sections, setSections],
  };
}

function createBackupObject(userEmail, sections) {
  const stringified = JSON.stringify(sections);
  const base64Sections = Buffer.from(stringified).toString("base64");
  const lastBackupTime = Date.now();
  return { userEmail, lastBackupTime, base64Sections };
}

function shouldBackup(lastBackupKey) {
  const lastBackupTime = +localStorage.getItem(lastBackupKey);
  const currentTime = Date.now();
  return !lastBackupTime || currentTime - lastBackupTime >= DAY_DURATION;
}
