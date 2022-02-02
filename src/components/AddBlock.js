import { Field, Form, FormikProvider, useFormik } from "formik";

import styled from "styled-components";
import Modal from "./Modal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const InputComponent = styled.div`
  display: flex;
  color: black;
`;

const Label = styled.label`
  width: 50%;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = ({ fieldName, label, autoFocus = false }) => (
  <InputComponent>
    <Label htmlFor={fieldName}>{label}:</Label>
    <Field
      style={{ width: "50%" }}
      id={fieldName}
      name={fieldName}
      type="text"
      autoFocus={autoFocus}
    />
  </InputComponent>
);

export default function AddBlock({ isOpen, onClose, onSubmit, initialValues }) {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: (
      { blockNumber, squatMax, overheadMax, deadliftMax, benchMax },
      { resetForm }
    ) => {
      onSubmit(blockNumber, squatMax, overheadMax, deadliftMax, benchMax);
      resetForm();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <FormikProvider value={formik}>
          <InputForm>
            <InputContainer>
              <Input fieldName="squatMax" label="Squat" autoFocus={true} />
              <Input fieldName="overheadMax" label="Overhead" />
              <Input fieldName="deadliftMax" label="Deadlift" />
              <Input fieldName="benchMax" label="Bench" />
              <Input fieldName="blockNumber" label="Block No." />
            </InputContainer>
            <ButtonContainer>
              <button onClick={onClose}>Cancel</button>
              <button type="submit">Submit</button>
            </ButtonContainer>
          </InputForm>
        </FormikProvider>
      </Container>
    </Modal>
  );
}
