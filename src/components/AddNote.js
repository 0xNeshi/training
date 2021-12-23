import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import Modal from "./Modal";

function AddNote({ isOpen, onClose }) {
  const formik = useFormik({
    initialValues: {
      title: "",
      text: "",
      dateCreated: Date.now(),
    },
    onSubmit: (values) => {
      console.log(values);
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormikProvider value={formik}>
        <Form>
          <input id="title" name="title" placeholder="Title" type="text" />
          <input id="text" name="text" placeholder="Text" type="text" />
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
