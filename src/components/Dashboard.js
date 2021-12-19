import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { useGetBlocks } from "../hooks/useGetBlocks";
import Block from "./Block";

const Title = styled.h3`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 90vh;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100%;
  overflow: auto;
`;

function Dashboard() {
  const { exercise } = useParams();
  const { isLoading, blocks } = useGetBlocks(exercise);

  const blockComponents = blocks
    .sort((b1, b2) => b2.trainingMax - b1.trainingMax)
    .map((block) => (
      <Block number={block.number} trainingMax={block.trainingMax} />
    ));

  return (
    <Container>
      <Title>{exercise.toUpperCase()}</Title>
      {!isLoading && <Content>{blockComponents}</Content>}
    </Container>
  );
}

export default Dashboard;
