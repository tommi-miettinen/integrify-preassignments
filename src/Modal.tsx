import { useEffect, useRef } from "react";

interface ModalProps {
  id: string;
  visible: boolean;
  children?: JSX.Element | JSX.Element[] | undefined | null;
  onClose: () => void;
}

const Modal = ({ visible, children, onClose, id }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    modalRef.current?.addEventListener("click", handleClose);

    return () => {
      modalRef.current?.removeEventListener("click", handleClose);
    };
  }, []);

  useEffect(() => {
    visible ? modalRef.current?.showModal() : modalRef.current?.close();
  }, [visible]);

  const handleClose = (e: Event) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <dialog ref={modalRef} id={id} className="modal">
      <div>{children}</div>
    </dialog>
  );
};

export default Modal;
