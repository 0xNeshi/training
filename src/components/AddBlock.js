import styled from "styled-components";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";

const schema = yup.object().shape({
  squatMax: yup.number().required(),
  overheadMax: yup.number().required(),
  benchMax: yup.number().required(),
  deadliftMax: yup.number().required(),
  blockNumber: yup.number().required(),
});

export default function AddBlock({ isOpen, onClose, onSubmit, initialValues }) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <InputForm onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <TextField
              id="standard-basic"
              label="Squat max"
              variant="standard"
              {...register("squatMax")}
            />
            <TextField
              id="standard-basic"
              label="Bench max"
              variant="standard"
              {...register("benchMax")}
            />
            <TextField
              id="standard-basic"
              label="Deadlift max"
              variant="standard"
              {...register("deadliftMax")}
            />
            <TextField
              id="standard-basic"
              label="Overhead max"
              variant="standard"
              {...register("overheadMax")}
            />
            <TextField
              id="standard-basic"
              label="Block number"
              variant="standard"
              {...register("blockNumber")}
            />
          </InputContainer>
          <ButtonContainer>
            <Button
              type="button"
              variant="outlined"
              onClick={onClose}
              color="secondary"
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Submit
            </Button>
          </ButtonContainer>
        </InputForm>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
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
  height: 100%;
  justify-content: space-evenly;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
`;
