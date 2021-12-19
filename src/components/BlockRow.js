import React from "react";
import styled from "styled-components";
import { AmrapInput } from "./AmrapInput";

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

function BlockRow({ changeAmrap, repSchema, weights, amrap }) {
  const [first, second, third] = weights;

  return (
    <Container>
      <RepSchema>{repSchema}</RepSchema>
      <Text>-</Text>
      <Weights>
        {first} , {second} , {third}
      </Weights>
      <Text>+</Text>
      <AmrapInput reps={amrap} onChangeAmrap={changeAmrap} />
    </Container>
  );
}

export default BlockRow;
