import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import {
  deleteBlock,
  updateAmrapReps,
  useGetBlocks,
} from "../hooks/useGetBlocks2";
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
`;

function Dashboard() {
  const { isLoading, blocks, refresh } = useGetBlocks();

  const changeAmrapReps = (blockId, exercise, amrapReps, weekNumber) => {
    updateAmrapReps(exercise, blockId, amrapReps, weekNumber);
    refresh();
  };

  const handleDeleteBlock = (blockId) => {
    deleteBlock(blockId);
    refresh();
  };

  const blockComponents = blocks
    .sort((b1, b2) => b2.dateCreated - b1.dateCreated)
    .map((block) => (
      <Block
        key={block.id}
        data={block}
        changeAmrapReps={(exercise, weekNumber, amrapReps) =>
          changeAmrapReps(block.id, exercise, amrapReps, weekNumber)
        }
        deleteBlock={() => handleDeleteBlock(block.id)}
      />
    ));

  return (
    <Container>{!isLoading && <Content>{blockComponents}</Content>}</Container>
  );
}

export default Dashboard;
