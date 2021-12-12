import React from "react";
import styled from "styled-components";
import BlockRow from "./BlockRow";

function Block({ number, trainingMax }) {
  const sixtyFive = calculate(trainingMax, 0.65);
  const seventy = calculate(trainingMax, 0.7);
  const seventyFive = calculate(trainingMax, 0.75);
  const eighty = calculate(trainingMax, 0.8);
  const eightyFive = calculate(trainingMax, 0.85);
  const ninety = calculate(trainingMax, 0.9);
  const ninetyFive = calculate(trainingMax, 0.95);

  return (
    <Container>
      <Title>
        Block {number} ({trainingMax}kg)
      </Title>
      <Divider />
      <BlockRow weights={[seventyFive, eightyFive, ninetyFive]} amrap={10} />
    </Container>
  );
}

export default Block;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  width: 80%;
  border: 1px solid white;
  border-radius: 20px;
  padding: 0 20px;
`;

const Title = styled.h3`
  width: 100%;
`;

const Divider = styled.hr`
  width: 100%;
`;

const calculate = (weight, percent) => {
  const exactWeight = weight * percent;
  const mod = exactWeight % 2.5;
  return exactWeight - mod;
};
