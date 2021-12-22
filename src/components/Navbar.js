import React from "react";
import styled from "styled-components";

const Container = styled.nav`
  height: 3vh;
  display: flex;
  align-items: end;
  justify-content: center;
  box-shadow: 0 0px 4px 2px black;
`;

function Navbar() {
  return <Container />;
}

export default Navbar;
