import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

function AddNote({ isOpen, onClose }) {
  const [overlayRef, setOverlayRef] = useState();

  useEffect(() => {
    if (overlayRef?.style) {
      overlayRef.style.zIndex = 3;
    }
  }, [overlayRef?.style]);

  return (
    <ReactModal
      isOpen={isOpen}
      overlayRef={(_ref) => setOverlayRef(_ref)}
      onRequestClose={onClose}
      contentLabel="Minimal Modal Example"
    >
      <button onClick={onClose}>Close Modal</button>
    </ReactModal>
  );
}

export default AddNote;
