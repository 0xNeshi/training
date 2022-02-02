import styled from "styled-components";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";

const schema = yup.object().shape({
  title: yup.string().required("Required"),
  text: yup.string(),
});

export default function AddNote({ isOpen, onClose, onSubmit }) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      text: "",
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AddNoteForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <TextField label="Title" variant="standard" {...register("title")} />
          <TextField
            label="Text"
            multiline
            rows={4}
            variant="filled"
            {...register("text")}
          />
        </InputContainer>
        <ButtonContainer>
          <Button
            type="button"
            variant="outlined"
            onClick={onClose}
            color="secondary"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </ButtonContainer>
      </AddNoteForm>
    </Modal>
  );
}

const AddNoteForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 80%;
`;
