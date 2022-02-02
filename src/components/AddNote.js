import { Field, Form, FormikProvider, useFormik } from "formik";
import styled from "styled-components";
import Modal from "./Modal";

export default function AddNote({ isOpen, onClose, onSubmit }) {
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
        <AddNoteForm>
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
        </AddNoteForm>
      </FormikProvider>
    </Modal>
  );
}

const ButtonContainer = styled.div`
  display: flex;
`;

const AddNoteForm = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
