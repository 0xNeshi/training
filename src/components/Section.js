import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import styled from "styled-components";

export default function Section(props) {
  const { sectionId, title, onDeleteSection, children } = props;

  const handleDeleteSection = useCallback(
    () => onDeleteSection(sectionId),
    [sectionId, onDeleteSection]
  );

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <FontAwesomeIcon
          icon={faTrashAlt}
          size="lg"
          color="darkgrey"
          style={{ cursor: "pointer" }}
          onClick={handleDeleteSection}
        />
      </Header>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  background-color: #222;
  color: lightgrey;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Title = styled.h3`
  width: 100%;
  margin-right: 7px;
`;
