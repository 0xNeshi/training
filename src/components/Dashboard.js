import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useGetSections } from "../hooks/useGetSections";
import { addSection, deleteSection, updateAmrapReps } from "../sectionService";
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
    dateCreated: Date.now(),
    weeks: weeks,
  };
};

const createExercise = (exerciseName, trainingMax) => ({
  name: exerciseName,
  trainingMax,
  amrapReps: 0,
});

function Dashboard() {
  const [isAddNodeModalOpen, setAddNodeModalOpen] = useState(false);
  const [isAddBlockModalOpen, setAddBlockModalOpen] = useState(false);

  const { isLoading, sections, refresh } = useGetSections();

  const nextBlockNumber = useMemo(() => {
    console.log("run");
    return (sections.find((s) => s.type === "block")?.number || 0) + 1;
  }, [sections]);

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

  return (
    <Container>
      {!isLoading && <Content>{sectionComponents}</Content>}
      <FABContainer>
        <FAB
          onAddNoteClicked={handleAddNoteClicked}
          onAddBlockClicked={handleAddBlockClicked}
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
        nextBlockNumber={nextBlockNumber}
      />
    </Container>
  );
}

export default Dashboard;
