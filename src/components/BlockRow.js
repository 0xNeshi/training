import React from "react";
import styled from "styled-components";

function BlockRow({ repSchema, weights, amrap }) {
  const [first, second, third] = weights;

  return (
    <Container>
      <span>
        <u>{repSchema}</u>
        <i>{` - ${first}, ${second}, ${third}`}</i>
      </span>
      <span>+ {amrap}</span>
    </Container>
  );
}

export default BlockRow;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 1.2em;
`;
