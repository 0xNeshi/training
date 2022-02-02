import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

export const AmrapInput = ({ reps, onChangeAmrapReps }) => {
  const [amrapReps, setAmrapReps] = useState(reps);

  const handleChangeAmrapReps = useCallback(
    () => amrapReps !== reps && onChangeAmrapReps(amrapReps),
    [amrapReps, reps, onChangeAmrapReps]
  );

  useEffect(() => {
    const timer = setTimeout(() => handleChangeAmrapReps(), WAIT_INTERVAL);
    return () => clearTimeout(timer);
  }, [reps, handleChangeAmrapReps]);

  const handleKeyDown = useCallback(
    (e) => e.keyCode === ENTER_KEY && handleChangeAmrapReps(),
    [handleChangeAmrapReps]
  );

  const handleFocus = useCallback((e) => e.target.select(), []);

  return (
    <Input
      value={amrapReps || ""}
      type="text"
      onChange={(e) => setAmrapReps(e.target.value)}
      onBlur={handleChangeAmrapReps}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
    />
  );
};

const Input = styled.input`
  width: 30px;
  height: 30px;
  border: 1px solid #514b3e;
  background-color: #514b3e;
  color: white;
  font-weight: 600;
  text-align: center;
`;
