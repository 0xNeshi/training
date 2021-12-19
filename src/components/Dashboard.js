import React from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Block from "./Block";

const blockStats = [
  {
    number: 1,
    exercise: "squat",
    trainingMax: 75,
  },
  {
    number: 2,
    exercise: "squat",
    trainingMax: 80,
  },
  {
    number: 3,
    exercise: "squat",
    trainingMax: 85,
  },
  {
    number: 4,
    exercise: "squat",
    trainingMax: 90,
  },
];

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

  const blocks = blockStats
    .sort((b1, b2) => b2.trainingMax - b1.trainingMax)
    .map((block) => (
      <Block number={block.number} trainingMax={block.trainingMax} />
    ));

  return (
    <Container>
      <Title>{exercise.toUpperCase()}</Title>
      <Content>{blocks}</Content>
    </Container>
  );
}

export default Dashboard;
