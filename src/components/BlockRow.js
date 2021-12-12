import React from "react";
import styled from "styled-components";

function BlockRow({ weights, amrap }) {
  const [first, second, third] = weights;

  return (
    <Container>
      <span>
        531 - {first}, {second}, {third}
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
