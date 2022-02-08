import { useEffect, useState } from "react";
import ReactModal from "react-modal";

export default function Modal({ isOpen, onClose, children }) {
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
      style={modalStyle}
    >
      {children}
    </ReactModal>
  );
}

const modalStyle = {
  content: {
    height: "fit-content",
    marginTop: "auto",
    marginBottom: "auto",
    backgroundColor: "#222",
    borderRadius: "3px",
    border: "0",
  },
  overlay: {
    backgroundColor: "rgba(22, 22, 22, 0.75)",
  },
};

ReactModal.setAppElement("#root");
