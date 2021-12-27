import React, { useState } from "react";
import styled from "styled-components";
import { useGetSections } from "../hooks";
import { signOut } from "../services/authService";
import {
  addSection,
  deleteSection,
  updateAmrapReps,
} from "../services/sectionService";
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

function Dashboard() {
  const [isAddNodeModalOpen, setAddNodeModalOpen] = useState(false);
  const [isAddBlockModalOpen, setAddBlockModalOpen] = useState(false);

  const { isLoading, sections, refresh } = useGetSections();

  const changeAmrapReps = (sectionId, weekNumber, exercise, amrapReps) => {
    updateAmrapReps(sectionId, weekNumber, exercise, amrapReps);
    refresh();
  };

  const handleDeleteSection = (sectionId) => {
    deleteSection(sectionId);
    refresh();
  };

  const handleAddNoteClicked = () => setAddNodeModalOpen(true);

  const handleAddNoteClosed = () => setAddNodeModalOpen(false);

  const handleAddNote = (title, text) => {
    addSection({ title, text, dateCreated: Date.now(), type: "note" });
    refresh();
  };

  const handleAddBlockClicked = () => setAddBlockModalOpen(true);

  const handleAddBlockClosed = () => setAddBlockModalOpen(false);

  const handleAddBlock = (
    blockNumber,
    squatMax,
    overheadMax,
    deadliftMax,
    benchMax
  ) => {
    const section = createBlock(
      blockNumber,
      squatMax,
      overheadMax,
      deadliftMax,
      benchMax
    );
    addSection(section);
    refresh();
  };

  const handleSignOutClicked = () => {
    signOut();
  };

  const sectionComponents = sections.map((section) =>
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
      <Note key={section.id} data={section} deleteNote={handleDeleteSection} />
    )
  );

  const suggestedValues = getNewBlockSuggestedValues(sections);

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

export default Dashboard;
