import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 30px;
  height: 30px;
  border: 1px solid #514b3e;
  background-color: #514b3e;
  color: white;
  font-weight: 600;
  text-align: center;

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

export const AmrapInput = ({ reps, onChangeAmrapReps }) => {
  const [amrapReps, setAmrapReps] = useState(reps);

  const handleChangeAmrapReps = useCallback(
    (newAmrapReps) => {
      if (newAmrapReps === reps) {
        return;
      }
      onChangeAmrapReps(newAmrapReps);
    },
    [reps, onChangeAmrapReps]
  );

  useEffect(() => {
    const timer = setTimeout(
      () => handleChangeAmrapReps(amrapReps),
      WAIT_INTERVAL
    );

    return () => {
      clearTimeout(timer);
    };
  }, [amrapReps, reps, handleChangeAmrapReps]);

  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY) {
      handleChangeAmrapReps(amrapReps);
    }
  };

  const handleFocus = (e) => e.target.select();

  return (
    <Input
      value={amrapReps || ""}
      type="number"
      onChange={(e) => setAmrapReps(+e.target.value)}
      onBlur={() => handleChangeAmrapReps(amrapReps)}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
    />
  );
};
