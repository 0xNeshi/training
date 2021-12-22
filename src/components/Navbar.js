import React from "react";
import styled from "styled-components";

const Container = styled.nav`
  height: 5vh;
  box-shadow: 0 1px 8px black;
  z-index: 10;
`;

function Navbar() {
  return <Container />;
}

export default Navbar;
