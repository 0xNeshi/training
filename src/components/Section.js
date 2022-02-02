import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import styled from "styled-components";

export default function Section({
  sectionId,
  title,
  onDeleteSection,
  children,
}) {
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
          color="red"
          style={{ cursor: "pointer" }}
          onClick={handleDeleteSection}
        />
      </Header>
      {children && <Divider />}
      {children}
    </Container>
  );
}

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
