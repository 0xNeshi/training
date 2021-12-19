import React from "react";
import styled from "styled-components";

const Container = styled.footer`
  height: 5vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-style: italic;
  padding-bottom: 5px;
`;

function Footer() {
  return (
    <Container>
      <small>&copy; Copyright 2021, Nenad Misic</small>
    </Container>
  );
}

export default Footer;
