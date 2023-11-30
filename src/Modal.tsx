import { useEffect } from "react";

interface ModalProps {
  visible: boolean;
  children?: JSX.Element | JSX.Element[] | undefined | null;
  onClose: () => void;
}

const Modal = ({ visible, children, onClose }: ModalProps) => {
  useEffect(() => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    modal.addEventListener("click", handleClose);
  }, []);

  useEffect(() => {
    visible ? showModal() : hideModal();
  }, [visible]);

  const handleClose = (e: any) => {
    if (e.target.id !== "my_modal_2") return;
    onClose();
  };

  const showModal = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    modal.showModal();
  };

  const hideModal = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement;
    modal.close();
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div>{children}</div>
    </dialog>
  );
};

export default Modal;
