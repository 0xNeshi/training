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

function AddBlock({ isOpen, onClose, onSubmit, initialValues }) {
  const formik = useFormik({
    initialValues: {
      squatMax: initialValues.squatMax,
      overheadMax: initialValues.overheadMax,
      deadliftMax: initialValues.deadliftMax,
      benchMax: initialValues.benchMax,
      blockNumber: initialValues.nextBlockNumber,
    },
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
      <FormikProvider value={formik}>
        <Form>
          <Input fieldName="squatMax" label="Squat" autoFocus={true} />
          <Input fieldName="overheadMax" label="Overhead" />
          <Input fieldName="deadliftMax" label="Deadlift" />
          <Input fieldName="benchMax" label="Bench" />
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
