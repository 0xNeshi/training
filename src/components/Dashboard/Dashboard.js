import { Divider, Fade, useScrollTrigger } from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { useSections } from "../../hooks";
import { UserContext } from "../../providers";
import { getNewBlockSuggestedValues } from "../../utilities";
import Block from "../Block";
import Loading from "../Loading";
import Note from "../Note";
import FAB from "./FAB";
import {
  useAddBlockModal,
  useAddNoteModal,
  useNetworkChangeEvents,
  useRemoveSectionModal,
  useSignOutModal,
} from "./hooks";

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

  const [ref, setRef] = useState();

  const handleAddSection = useCallback(
    (section) => {
      addSection(section);
      ref?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    [addSection, ref]
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

  const trigger = useScrollTrigger({
    target: ref ? ref : window,
  });

  return (
    <Container>
      <Content ref={(_ref) => setRef(_ref)}>
        {!isLoading && !sectionComponents?.length && <EmptySectionsMessage />}
        {!isLoading && !!sectionComponents?.length && sectionComponents}
        {isLoading && <Loading />}
        <Footer>&copy;Copyright 2022 by misicnenad</Footer>
      </Content>
      <Fade in={!isLoading && !trigger} unmountOnExit>
        <FABContainer>
          <FAB
            onAddNote={openAddNote}
            onAddBlock={handleOpenAddBlock}
            onSignOut={openSignOut}
          />
        </FABContainer>
      </Fade>
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
  height: 100vh;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #282c34;
`;

const FABContainer = styled.div`
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 2;
`;

const Footer = styled.footer`
  font-size: 12px;
  width: 100%;
  margin-top: auto;
  text-align: center;
`;
