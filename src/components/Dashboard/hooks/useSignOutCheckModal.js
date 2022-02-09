import { useCallback, useContext } from "react";
import { ModalContext } from "../../../providers";
import { signOut } from "../../../services/authService";
import { SignOutCheck } from "../../Modals";

export default function useSignOutCheckModal() {
  const { openModal, closeModal } = useContext(ModalContext);

  const open = useCallback(() => {
    const onSignOut = () => {
      closeModal();
      signOut();
    };
    const modalContent = (
      <SignOutCheck onSignOut={onSignOut} onClose={closeModal} />
    );
    openModal(modalContent);
  }, [openModal, closeModal]);

  return {
    open,
    close: closeModal,
  };
}
