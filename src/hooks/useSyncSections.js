import { Button } from "@mui/material";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ModalContext } from "../providers/ModalProvider";
import { getSectionsFromBackup, pushBackup } from "../utilities";
import usePersistentState from "./usePersistentState";

// 1000 ms * 60 secs * 60 mins * 24 hours = 86400000 ms
const DAY_DURATION = 86400000;

export default function useSyncSections(userEmail) {
  const sectionsKey = useMemo(() => `sections-${userEmail}`, [userEmail]);
  const lastBackupKey = useMemo(() => `lastbackup-${userEmail}`, [userEmail]);
  const [sections, setSections] = usePersistentState(sectionsKey, []);
  const [isLoading, setLoading] = useState(false);

  const { openModal, closeModal } = useContext(ModalContext);

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
      const modalContent = <FetchCheck onFetch={fetch} onClose={closeModal} />;
      return openModal(modalContent);
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

function FetchCheck({ onFetch, onClose }) {
  return (
    <Container>
      <h4>Do you want to restore your data from the backup?</h4>
      <ButtonContainer>
        <Button
          type="button"
          variant="outlined"
          onClick={onClose}
          color="secondary"
        >
          No
        </Button>
        <Button variant="contained" color="secondary" onClick={onFetch}>
          Yes
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

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
