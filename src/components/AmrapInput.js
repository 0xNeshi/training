import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

const Input = styled.input`
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

export const AmrapInput = ({ reps, onChangeAmrap }) => {
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
    <Input
      value={amrapReps}
      type="number"
      onChange={(e) => setAmrapReps(+e.target.value)}
      onBlur={() => handleChangeAmrapReps(amrapReps)}
      onKeyDown={handleKeyDown}
    />
  );
};
