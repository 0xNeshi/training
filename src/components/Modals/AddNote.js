import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import Input from "../Input";

const schema = yup.object().shape({
  title: yup.string().required("Required"),
  text: yup.string(),
});

export default function AddNote({ onClose, onSubmit }) {
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputContainer>
        <Input
          label="Title"
          registerReturn={register("title")}
          error={errors?.title?.message}
        />
        <Input
          label="Text"
          registerReturn={register("text")}
          error={errors?.text?.message}
          multiline
          rows={5}
          variant="filled"
        />
      </InputContainer>
      <ButtonContainer>
        <Button
          type="button"
          variant="outlined"
          onClick={onClose}
          color="warning"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </ButtonContainer>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 40vh;
  justify-content: space-between;
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
