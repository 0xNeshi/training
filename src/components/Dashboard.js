import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  deleteBlock,
  updateAmrapReps,
  useGetBlocks,
} from "../hooks/useGetBlocks";
import Block from "./Block";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
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
  box-shadow: inset 0 0 10px rgba(0, 0, 0);
`;

function Dashboard() {
  const { exercise } = useParams();
  const { isLoading, blocks, refresh } = useGetBlocks(exercise);

  const changeAmrapReps = (blockId, amrapReps, weekNumber) => {
    updateAmrapReps(exercise, blockId, amrapReps, weekNumber);
    refresh();
  };

  const handleDeleteBlock = (blockId) => {
    deleteBlock(exercise, blockId);
    refresh();
  };

  const blockComponents = blocks
    .sort((b1, b2) => b2.dateCreated - b1.dateCreated)
    .map((block) => (
      <Block
        key={block.id}
        data={block}
        changeAmrapReps={(amrapReps, weekNumber) =>
          changeAmrapReps(block.id, amrapReps, weekNumber)
        }
        deleteBlock={() => handleDeleteBlock(block.id)}
      />
    ));

  return (
    <Container>{!isLoading && <Content>{blockComponents}</Content>}</Container>
  );
}

export default Dashboard;
