import { Button } from "@mui/material";
import styled from "styled-components";
import Modal from "./Modal";

export default function DeleteSectionCheck(props) {
  const { isOpen, onClose, onSubmit } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <h4>Are you sure you want to delete this block?</h4>
        <ButtonContainer>
          <Button
            type="button"
            variant="outlined"
            onClick={onClose}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onSubmit}
          >
            Delete
          </Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;
