import React, { useEffect, useState, useCallback } from "react";
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

const AmrapInput = styled.input`
  flex-grow: 1;
  width: 10px;
  height: 30px;
  border: 1px solid white;
  border-radius: 5px;
  font-size: 1.2rem;
  font-weight: 500;

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

const Amrap = ({ reps, onChangeAmrap }) => {
  const [amrapReps, setAmrapReps] = useState(reps);

  const handleChangeAmrapReps = useCallback(
    (newAmrapReps) => {
      if (newAmrapReps === reps) {
        return;
      }

      onChangeAmrap(newAmrapReps);
    },
    [reps, onChangeAmrap]
  );

  useEffect(() => {
    if (amrapReps === reps) {
      return;
    }
    const timer = setTimeout(
      () => handleChangeAmrapReps(amrapReps),
      WAIT_INTERVAL
    );

    return () => {
      clearTimeout(timer);
    };
  }, [amrapReps, reps, handleChangeAmrapReps]);

  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY && amrapReps !== reps) {
      handleChangeAmrapReps(amrapReps);
    }
  };

  return (
    <AmrapInput
      value={amrapReps}
      type="number"
      onChange={(e) => setAmrapReps(+e.target.value)}
      onBlur={() => handleChangeAmrapReps(amrapReps)}
      onKeyDown={handleKeyDown}
    />
  );
};

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
      <Amrap reps={amrap} onChangeAmrap={changeAmrap} />
    </Container>
  );
}

export default BlockRow;
