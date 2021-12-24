import { Field, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import styled from "styled-components";
import Modal from "./Modal";

const InputContainer = styled.div`
  display: flex;
`;

const Label = styled.label`
  width: 50%;
  text-align: right;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Input = ({ fieldName, label, autoFocus = false }) => (
  <InputContainer>
    <Label htmlFor={fieldName}>{label}:</Label>
    <Field
      style={{ width: "50%" }}
      id={fieldName}
      name={fieldName}
      type="number"
      autoFocus={autoFocus}
    />
  </InputContainer>
);

function AddBlock({ isOpen, onClose, onSubmit, nextBlockNumber }) {
  const formik = useFormik({
    initialValues: {
      squat: "",
      overhead: "",
      deadlift: "",
      bench: "",
      blockNumber: nextBlockNumber,
    },
    enableReinitialize: true,
    onSubmit: (
      { blockNumber, squat, overhead, deadlift, bench },
      { resetForm }
    ) => {
      onSubmit(blockNumber, squat, overhead, deadlift, bench);
      resetForm();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormikProvider value={formik}>
        <Form>
          <Input fieldName="squat" label="Squat" autoFocus={true} />
          <Input fieldName="overhead" label="Overhead" />
          <Input fieldName="deadlift" label="Deadlift" />
          <Input fieldName="bench" label="Bench" />
          <Input fieldName="blockNumber" label="Block No." />
          <ButtonContainer>
            <button onClick={onClose}>Cancel</button>
            <button type="submit">Submit</button>
          </ButtonContainer>
        </Form>
      </FormikProvider>
    </Modal>
  );
}

export default AddBlock;
