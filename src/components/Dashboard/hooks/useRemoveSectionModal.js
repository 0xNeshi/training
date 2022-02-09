import { useCallback, useContext } from "react";
import { ModalContext } from "../../../providers";
import { DeleteSectionCheck } from "../../Modals";

export default function useRemoveSectionCheck(remove) {
  const { openModal, closeModal } = useContext(ModalContext);

  const open = useCallback(
    (sectionId) => {
      const content = (
        <DeleteSectionCheck
          onClose={closeModal}
          onConfirm={() => {
            remove(sectionId);
            closeModal();
          }}
        />
      );
      openModal(content);
    },
    [openModal, closeModal, remove]
  );

  return {
    open,
    close: closeModal,
  };
}
