import { useCallback, useContext, useMemo } from "react";
import styled from "styled-components";
import { useSections } from "../../hooks";
import { UserContext } from "../../providers";
import { getNewBlockSuggestedValues } from "../../utilities";
import Block from "../Block";
import Note from "../Note";
import {
  useAddBlockModal,
  useAddNoteModal,
  useNetworkChangeEvents,
  useRemoveSectionModal,
  useSignOutModal,
} from "./hooks";
import FAB from "./FAB";

export default function Dashboard() {
  const { user } = useContext(UserContext);

  useNetworkChangeEvents();

  const {
    isLoading,
    sections,
    add: addSection,
    remove: removeSection,
    update: updateSection,
  } = useSections(user.email);

  const wind = window;

  const handleAddSection = useCallback(
    (section) => {
      addSection(section);
      wind.scrollTo({
        top: 0,
        behavior: "smooth", // for smoothly scrolling
      });
    },
    [addSection]
  );

  const { open: openAddNote } = useAddNoteModal(handleAddSection);
  const { open: openAddBlock } = useAddBlockModal(handleAddSection);
  const { open: openRemoveSection } = useRemoveSectionModal(removeSection);
  const { open: openSignOut } = useSignOutModal();

  const sortedSections = useMemo(
    () => [...sections].sort((s1, s2) => s2.dateCreated - s1.dateCreated),
    [sections]
  );

  const handleOpenAddBlock = useCallback(() => {
    const suggestedValues = getNewBlockSuggestedValues(sortedSections);
    openAddBlock(suggestedValues);
  }, [openAddBlock, sortedSections]);

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
            deleteBlock={openRemoveSection}
          />
        ) : (
          <Note
            key={section.id}
            data={section}
            deleteNote={openRemoveSection}
          />
        )
      ),
    [sortedSections, changeAmrapReps, openRemoveSection]
  );

  return (
    <Container>
      {!isLoading && (
        <Content>
          {!sectionComponents?.length && <EmptySectionsMessage />}
          {sectionComponents}
          <Footer>&copy;Copyright 2022 by misicnenad</Footer>
        </Content>
      )}
      <FABContainer>
        <FAB
          onAddNote={openAddNote}
          onAddBlock={handleOpenAddBlock}
          onSignOut={openSignOut}
        />
      </FABContainer>
    </Container>
  );
}

function EmptySectionsMessage() {
  return (
    <div
      style={{
        marginTop: "auto",
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
  font-size: 12px;
  height: 20px;
  margin-top: auto;
`;
