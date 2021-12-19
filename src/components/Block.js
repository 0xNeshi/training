import React from "react";
import styled from "styled-components";
import { useGetWeights } from "../hooks/useGetWeights";
import BlockRow from "./BlockRow";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const BlockRowContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`;

function Block({ blockNumber, trainingMax }) {
  const [
    sixtyFive,
    seventy,
    seventyFive,
    eighty,
    eightyFive,
    ninety,
    ninetyFive,
  ] = useGetWeights(trainingMax);

  return (
    <Container>
      <Title>
        Block {blockNumber} ({trainingMax}kg)
      </Title>
      <Divider />
      <BlockRowContainer>
        <BlockRow
          repSchema={"5/3/1"}
          weights={[seventyFive, eightyFive, ninetyFive]}
          amrap={10}
        />
        <BlockRow
          repSchema={"3/3/3"}
          weights={[seventy, eighty, ninety]}
          amrap={10}
        />
        <BlockRow
          repSchema={"5/5/5"}
          weights={[sixtyFive, seventyFive, eightyFive]}
          amrap={10}
        />
      </BlockRowContainer>
    </Container>
  );
}

export default Block;
