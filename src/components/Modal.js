import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";

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
      contentLabel="Minimal Modal Example"
    >
      {children}
    </ReactModal>
  );
}

export default Modal;
