import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.2em;
  height: 60px;
`;

const Text = styled.span`
  flex-grow: 1;
`;

const RepSchema = styled(Text)`
  text-decoration: underline;
`;

const Weights = styled.span`
  flex-grow: 3;
  font-style: italic;
`;

function BlockRow({ repSchema, weights, amrap }) {
  const [first, second, third] = weights;

  return (
    <Container>
      <RepSchema>{repSchema}</RepSchema>
      <Text>-</Text>
      <Weights>
        {first} , {second} , {third}
      </Weights>
      <Text>x {amrap}</Text>
    </Container>
  );
}

export default BlockRow;
