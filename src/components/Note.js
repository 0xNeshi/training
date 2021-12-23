import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  border: 1px solid white;
  border-radius: 20px;
  padding: 0 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h3`
  width: 100%;
`;

const Divider = styled.hr`
  width: 100%;
`;

const Text = styled.p`
  width: 100%;
`;

function Note({ data, deleteNote }) {
  const { id: noteId, title, text } = data;

  const handleDeleteNote = useCallback(
    () => deleteNote(noteId),
    [noteId, deleteNote]
  );

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="lg"
          color="red"
          style={{ cursor: "pointer" }}
          onClick={handleDeleteNote}
        />
      </Header>
      {text && (
        <>
          <Divider />
          <Text>{text}</Text>
        </>
      )}
    </Container>
  );
}

export default Note;
