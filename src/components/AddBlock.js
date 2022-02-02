import { yupResolver } from "@hookform/resolvers/yup";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import Modal from "./Modal";

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
      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <TextField
            label="Squat max"
            variant="standard"
            {...register("squatMax")}
          />
          <TextField
            label="Bench max"
            variant="standard"
            {...register("benchMax")}
          />
          <TextField
            label="Deadlift max"
            variant="standard"
            {...register("deadliftMax")}
          />
          <TextField
            label="Overhead max"
            variant="standard"
            {...register("overheadMax")}
          />
          <TextField
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
    </Modal>
  );
}

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
  width: 100%;
  align-items: center;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 20px;
`;
