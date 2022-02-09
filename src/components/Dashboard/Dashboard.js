import { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import { useSections } from "../../hooks";
import { ModalContext, UserContext } from "../../providers";
import { signOut } from "../../services/authService";
import { getNewBlockSuggestedValues } from "../../utilities";
import Block from "../Block";
import { AddBlock, DeleteSectionCheck, SignOutCheck } from "../Modals";
import Note from "../Note";
import FAB from "./FAB";
import { useAddNoteModal } from "./hooks";
import useNetworkChangeEvents from "./useNetworkChangeEvents";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const { openModal, closeModal } = useContext(ModalContext);

  useNetworkChangeEvents();

  const {
    isLoading,
    sections,
    add: addSection,
    remove: deleteSection,
    update: updateSection,
  } = useSections(user.email);

  const { open: openAddNote } = useAddNoteModal(addSection);

  const sortedSections = useMemo(
    () => [...sections].sort((s1, s2) => s2.dateCreated - s1.dateCreated),
    [sections]
  );

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

  const handleAddNote = useCallback(
    () => openAddNote(),
    [openAddNote, addSection]
  );

  const suggestedValues = useMemo(
    () => getNewBlockSuggestedValues(sortedSections),
    [sortedSections]
  );

  const handleAddBlockClicked = useCallback(() => {
    const onSubmit = (blockData) => {
      const section = createBlock(blockData);
      addSection(section);
      closeModal();
    };
    const modalContent = (
      <AddBlock
        onSubmit={onSubmit}
        onClose={closeModal}
        initialValues={suggestedValues}
      />
    );
    openModal(modalContent);
  }, [closeModal, openModal, addSection, suggestedValues]);

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

  const handleOpenDeleteSectionModal = useCallback(
    (sectionId) => {
      const content = (
        <DeleteSectionCheck
          onClose={closeModal}
          onConfirm={() => {
            deleteSection(sectionId);
            closeModal();
          }}
        />
      );
      openModal(content);
    },
    [closeModal, deleteSection, openModal]
  );

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
          onAddNoteClicked={handleAddNote}
          onAddBlockClicked={handleAddBlockClicked}
          onSignOutClicked={handleSignOutClicked}
        />
      </FABContainer>
    </Container>
  );
}

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
  margin-top: auto;
`;

const createBlock = (blockData) => {
  const weeks = [];
  const numberOfWeeks = 3;

  for (let i = 1; i <= numberOfWeeks; i++) {
    weeks.push({
      number: i,
      exercises: [
        createExercise("squat", blockData.squatMax),
        createExercise("overhead", blockData.overheadMax),
        createExercise("deadlift", blockData.deadliftMax),
        createExercise("bench", blockData.benchMax),
      ],
    });
  }

  return {
    type: "block",
    number: blockData.blockNumber,
    weeks: weeks,
  };
};

const createExercise = (exerciseName, trainingMax) => ({
  name: exerciseName,
  trainingMax,
  amrapReps: 0,
});
