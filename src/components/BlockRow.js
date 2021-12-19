import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 1.2em;
  height: 70px;
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
  width: 100px;
`;

const Amrap = styled.input`
  flex-grow: 1;
  width: 10px;
  height: 30px;
  border: 1px solid white;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 500;
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
      <Text>+</Text>
      <Amrap value={amrap} />
    </Container>
  );
}

export default BlockRow;
