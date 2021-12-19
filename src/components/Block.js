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

function Block({ data }) {
  const { number, trainingMax, id, weeks } = data;

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
        Block {number} ({trainingMax}kg)
      </Title>
      <Divider />
      <BlockRowContainer>
        <BlockRow
          repSchema={"5/3/1"}
          weights={[seventyFive, eightyFive, ninetyFive]}
          amrap={weeks[2].amrapReps}
          changeAmrap={(reps) => console.log("reps", reps, id, weeks[2].number)}
        />
        <BlockRow
          repSchema={"3/3/3"}
          weights={[seventy, eighty, ninety]}
          amrap={weeks[1].amrapReps}
          changeAmrap={(reps) => console.log("reps", reps, id, weeks[1].number)}
        />
        <BlockRow
          repSchema={"5/5/5"}
          weights={[sixtyFive, seventyFive, eightyFive]}
          amrap={weeks[0].amrapReps}
          changeAmrap={(reps) => console.log("reps", reps, id, weeks[0].number)}
        />
      </BlockRowContainer>
    </Container>
  );
}

export default Block;
