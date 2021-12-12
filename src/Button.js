import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ButtonContainer = styled(Link)`
  width: 80vw;
  height: 3em;
  font-size: 1.2em;
  cursor: pointer;
  background: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  font-weight: bold;

  &:hover{
    background-color: #eee;
  }
`;

function Button(props) {
  return (
    <ButtonContainer to={`/dashboard/${props.exercise}`}>
      {props.text}
    </ButtonContainer>
  );
}

export default Button;
