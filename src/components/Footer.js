import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
  font-size: 0.6rem;
`;

function Footer() {
  return <Container>&copy; Copyright 2021, Nenad Misic</Container>;
}

export default Footer;
