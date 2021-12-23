import React from "react";
import styled from "styled-components";
import Section from "./Section";

const Text = styled.p`
  width: 100%;
`;

function Note({ data, deleteNote }) {
  const { id: noteId, title, text } = data;

  return (
    <Section sectionId={noteId} onDeleteSection={deleteNote} title={title}>
      {text && <Text>{text}</Text>}
    </Section>
  );
}

export default Note;
