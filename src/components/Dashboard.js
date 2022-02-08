import { useCallback, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { useSections } from "../hooks";
import { ModalContext } from "../providers/ModalProvider";
import { UserContext } from "../providers/UserProvider";
import { signOut } from "../services/authService";
import { getNewBlockSuggestedValues } from "../utilities";
import AddBlock from "./AddBlock";
import AddNote from "./AddNote";
import Block from "./Block";
import DeleteSectionCheck from "./DeleteSectionCheck";
import FAB from "./FAB";
import Note from "./Note";
import SignOutCheck from "./SignOutCheck";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const { openModal, closeModal } = useContext(ModalContext);

  const {
    isLoading,
    sections,
    add: addSection,
    remove: deleteSection,
    update: updateSection,
  } = useSections(user.email);
  const sortedSections = useMemo(
    () => [...sections].sort((s1, s2) => s2.dateCreated - s1.dateCreated),
    [sections]
  );
  const [isAddNodeModalOpen, setAddNodeModalOpen] = useState(false);
  const [isAddBlockModalOpen, setAddBlockModalOpen] = useState(false);
  const [isDeleteSectionModalOpen, setDeleteSectionModalOpen] = useState(false);

  const [sectionIdToDelete, setSectionIdToDelete] = useState();

  const changeAmrapReps = useCallback(
    (sectionId, weekNumber, exerciseName, amrapReps) => {
      const section = sortedSections.find((x) => x.id === sectionId);
      const week = section.weeks.find((week) => week.number === weekNumber);
      const exercise = week.exercises.find((e) => e.name === exerciseName);
      exercise.amrapReps = amrapReps;
      updateSection(section);
    },
    [sortedSections, updateSection]
  );

  const handleAddNoteClicked = useCallback(() => setAddNodeModalOpen(true), []);
  const handleAddNoteClosed = useCallback(() => setAddNodeModalOpen(false), []);
  const handleAddNote = useCallback(
    ({ title, text }) => {
      addSection({
        title,
        text,
        type: "note",
      });
      setAddNodeModalOpen(false);
    },
    [addSection]
  );
  const handleAddBlockClicked = useCallback(
    () => setAddBlockModalOpen(true),
    []
  );
  const handleAddBlockClosed = useCallback(
    () => setAddBlockModalOpen(false),
    []
  );
  const handleAddBlock = useCallback(
    ({ blockNumber, squatMax, overheadMax, deadliftMax, benchMax }) => {
      const section = createBlock(
        blockNumber,
        squatMax,
        overheadMax,
        deadliftMax,
        benchMax
      );
      addSection(section);
      setAddBlockModalOpen(false);
    },
    [addSection]
  );
  const handleSignOutClicked = useCallback(() => {
    const onSignOut = () => {
      closeModal();
      signOut();
    };
    const modalContent = (
      <SignOutCheck onSignOut={onSignOut} onClose={closeModal} />
    );
    openModal(modalContent);
  }, [closeModal, openModal]);

  const handleOpenDeleteSectionModal = useCallback((sectionId) => {
    setDeleteSectionModalOpen(true);
    setSectionIdToDelete(sectionId);
  }, []);
  const handleDeleteSectionCheckClosed = useCallback(
    () => setDeleteSectionModalOpen(false),
    []
  );

  const handleDeleteSection = useCallback(() => {
    deleteSection(sectionIdToDelete);
    setDeleteSectionModalOpen(false);
  }, [sectionIdToDelete, deleteSection]);

  const sectionComponents = useMemo(
    () =>
      sortedSections.map((section) =>
        section.type === "block" ? (
          <Block
            key={section.id}
            data={section}
            changeAmrapReps={(weekNumber, exercise, amrapReps) =>
              changeAmrapReps(section.id, weekNumber, exercise, amrapReps)
            }
            deleteBlock={handleOpenDeleteSectionModal}
          />
        ) : (
          <Note
            key={section.id}
            data={section}
            deleteNote={handleOpenDeleteSectionModal}
          />
        )
      ),
    [sortedSections, changeAmrapReps, handleOpenDeleteSectionModal]
  );

  const suggestedValues = useMemo(
    () => getNewBlockSuggestedValues(sortedSections),
    [sortedSections]
  );

  return (
    <Container>
      {!isLoading && (
        <Content>
          {!sectionComponents?.length && <AddFirstSectionMessage />}
          {sectionComponents}
          <Footer>&copy;Copyright 2022 by misicnenad</Footer>
        </Content>
      )}
      <FABContainer>
        <FAB
          onAddNoteClicked={handleAddNoteClicked}
          onAddBlockClicked={handleAddBlockClicked}
          onSignOutClicked={handleSignOutClicked}
        />
      </FABContainer>
      <AddNote
        isOpen={isAddNodeModalOpen}
        onClose={handleAddNoteClosed}
        onSubmit={handleAddNote}
      />
      <AddBlock
        isOpen={isAddBlockModalOpen}
        onClose={handleAddBlockClosed}
        onSubmit={handleAddBlock}
        initialValues={suggestedValues}
      />
      <DeleteSectionCheck
        isOpen={isDeleteSectionModalOpen}
        onClose={handleDeleteSectionCheckClosed}
        onSubmit={handleDeleteSection}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 20px 0 20px;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #282c34;
`;

const FABContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 2;
`;

const Footer = styled.footer`
  margin-top: 10px;
  font-size: 12px;
  justify-self: end;
`;

function AddFirstSectionMessage() {
  return (
    <div
      style={{
        marginTop: "auto",
        marginBottom: "auto",
        color: "lightgray",
      }}
    >
      Add your first block/note
    </div>
  );
}

const createBlock = (
  blockNumber,
  squatMax,
  overheadMax,
  deadliftMax,
  benchMax
) => {
  const weeks = [];
  const numberOfWeeks = 3;

  for (let i = 1; i <= numberOfWeeks; i++) {
    weeks.push({
      number: i,
      exercises: [
        createExercise("squat", squatMax),
        createExercise("overhead", overheadMax),
        createExercise("deadlift", deadliftMax),
        createExercise("bench", benchMax),
      ],
    });
  }

  return {
    type: "block",
    number: blockNumber,
    weeks: weeks,
  };
};

const createExercise = (exerciseName, trainingMax) => ({
  name: exerciseName,
  trainingMax,
  amrapReps: 0,
});
