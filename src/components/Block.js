import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import styled from "styled-components";
import WeekRow from "./WeekRow";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  border: 1px solid white;
  border-radius: 20px;
  padding: 0 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
          changeAmrap={changeAmrapReps}
          week={week}
          blockId={blockId}
        />
      );
    });

  const handleDeleteBlock = useCallback(
    () => deleteBlock(blockId),
    [blockId, deleteBlock]
  );

  return (
    <Container>
      <Header>
        <Title>Block {blockNumber}</Title>
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="lg"
          color="red"
          style={{ cursor: "pointer" }}
          onClick={handleDeleteBlock}
        />
      </Header>
      <Divider />
      <BlockRowContainer>
        {rows}
        {/* <BlockRow
          repSchema={"5/3/1"}
          weights={[seventyFive, eightyFive, ninetyFive]}
          amrap={weeks[2].amrapReps}
          changeAmrap={(reps) => changeAmrapReps(reps, weeks[2].number)}
        /> */}
        {/* <BlockRow
          repSchema={"3/3/3"}
          weights={[seventy, eighty, ninety]}
          amrap={weeks[1].amrapReps}
          changeAmrap={(reps) => changeAmrapReps(reps, weeks[1].number)}
        />
        <BlockRow
          repSchema={"5/5/5"}
          weights={[sixtyFive, seventyFive, eightyFive]}
          amrap={weeks[0].amrapReps}
          changeAmrap={(reps) => changeAmrapReps(reps, weeks[0].number)}
        /> */}
      </BlockRowContainer>
    </Container>
  );
}

export default Block;
