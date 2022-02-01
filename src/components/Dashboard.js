import React, { useCallback, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { useSections } from "../hooks";
import { UserContext } from "../providers/UserProvider";
import { signOut } from "../services/authService";
import { createBlock, getNewBlockSuggestedValues } from "../utilities";
import AddBlock from "./AddBlock";
import AddNote from "./AddNote";
import Block from "./Block";
import FAB from "./FAB";
import Note from "./Note";

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

export default function Dashboard() {
  const { user } = useContext(UserContext);
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
  const handleDeleteSection = useCallback(
    (sectionId) => deleteSection(sectionId),
    [deleteSection]
  );
  const handleAddNoteClicked = useCallback(() => setAddNodeModalOpen(true), []);
  const handleAddNoteClosed = useCallback(() => setAddNodeModalOpen(false), []);
  const handleAddNote = useCallback(
    (title, text) =>
      addSection({
        title,
        text,
        type: "note",
      }),
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
    (blockNumber, squatMax, overheadMax, deadliftMax, benchMax) => {
      const section = createBlock(
        blockNumber,
        squatMax,
        overheadMax,
        deadliftMax,
        benchMax
      );
      addSection(section);
    },
    [addSection]
  );
  const handleSignOutClicked = useCallback(() => signOut(), []);
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
            deleteBlock={handleDeleteSection}
          />
        ) : (
          <Note
            key={section.id}
            data={section}
            deleteNote={handleDeleteSection}
          />
        )
      ),
    [sortedSections, changeAmrapReps, handleDeleteSection]
  );
  const suggestedValues = useMemo(
    () => getNewBlockSuggestedValues(sortedSections),
    [sortedSections]
  );
  return (
    <Container>
      {!isLoading && <Content>{sectionComponents}</Content>}
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
    </Container>
  );
}
