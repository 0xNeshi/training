import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

const modalStyle = {
  content: {
    height: "50vh",
    marginTop: "auto",
    marginBottom: "auto",
  },
};

ReactModal.setAppElement("#root");

function Modal({ isOpen, onClose, children }) {
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
      style={modalStyle}>
      {children}
    </ReactModal>
  );
}

export default Modal;
