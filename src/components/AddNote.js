import { Field, Form, FormikProvider, useFormik } from "formik";
import React from "react";
import Modal from "./Modal";

function AddNote({ isOpen, onClose, onSubmit }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      dateCreated: Date.now(),
    },
    onSubmit: (values) => {
      console.log(values);
      const { title, text, dateCreated } = values;
      onSubmit(title, text, dateCreated);
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormikProvider value={formik}>
        <Form>
          <Field id="title" name="title" placeholder="Title" type="text" />
          <Field id="text" name="text" placeholder="Text" type="text" />
          <div>
            <button type="submit">Submit</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </Form>
      </FormikProvider>
    </Modal>
  );
}

export default AddNote;
