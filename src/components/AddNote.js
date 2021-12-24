import { Field, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import styled from "styled-components";
import Modal from "./Modal";

const ButtonContainer = styled.div`
  display: flex;
`;

function AddNote({ isOpen, onClose, onSubmit }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
    },
    onSubmit: ({ title, text }, { resetForm }) => {
      onSubmit(title, text);
      resetForm();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormikProvider value={formik}>
        <Form>
          <Field
            id="title"
            name="title"
            placeholder="Title"
            type="text"
            autoFocus={true}
          />
          <Field id="text" name="text" placeholder="Text" type="text" />
          <ButtonContainer>
            <button onClick={onClose}>Cancel</button>
            <button type="submit">Submit</button>
          </ButtonContainer>
        </Form>
      </FormikProvider>
    </Modal>
  );
}

export default AddNote;
