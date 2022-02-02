import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import * as yup from "yup";
import Input from "./Input";
import Modal from "./Modal";

const REQUIRED_NUMBER_SCHEMA = yup
  .number()
  .typeError("Must be a positive number")
  .positive("Must be a positive number")
  .required("Missing input");

const YUP_SHAPE = yup.object().shape({
  squatMax: REQUIRED_NUMBER_SCHEMA,
  overheadMax: REQUIRED_NUMBER_SCHEMA,
  benchMax: REQUIRED_NUMBER_SCHEMA,
  deadliftMax: REQUIRED_NUMBER_SCHEMA,
  blockNumber: REQUIRED_NUMBER_SCHEMA,
});

export default function AddBlock(props) {
  const { isOpen, onClose, onSubmit, initialValues } = props;

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(YUP_SHAPE),
    defaultValues: initialValues,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <InputForm onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <Input
            label="Squat max"
            registerReturn={register("squatMax")}
            error={errors?.squatMax?.message}
          />
          <Input
            label="Bench max"
            registerReturn={register("benchMax")}
            error={errors?.benchMax?.message}
          />
          <Input
            label="Deadlift max"
            registerReturn={register("deadliftMax")}
            error={errors?.deadliftMax?.message}
          />
          <Input
            label="Overhead max"
            registerReturn={register("overheadMax")}
            error={errors?.overheadMax?.message}
          />
          <Input
            label="Block number"
            registerReturn={register("blockNumber")}
            error={errors?.blockNumber?.message}
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
