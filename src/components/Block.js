import React from "react";
import styled from "styled-components";
import Section from "./Section";
import WeekRow from "./WeekRow";

const BlockRowContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

function Block({ data, changeAmrapReps, deleteBlock }) {
  const { id: blockId, number: blockNumber, weeks } = data;

  const rows = weeks
    .sort((w1, w2) => w2.number - w1.number)
    .map((week) => {
      return (
        <WeekRow
          key={`weekrow${blockId}${week.number}`}
          changeAmrapReps={changeAmrapReps}
          week={week}
          blockId={blockId}
        />
      );
    });

  return (
    <Section
      sectionId={blockId}
      title={`Block ${blockNumber}`}
      onDeleteSection={deleteBlock}
    >
      <BlockRowContainer>{rows}</BlockRowContainer>
    </Section>
  );
}

export default Block;
