import React, { useEffect } from "react";
import styles from "./index.module.scss";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
  fullWidth?: boolean;
  modalType?: "centered" | "right-aligned";
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  closeOnBackdropClick = true,
  fullWidth = false,
  modalType = "centered",
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (show && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onClose]);

  const onBackDropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  const modalContainerClassName = fullWidth
    ? `${styles.modalContainer} ${styles.fullWidth}`
    : styles.modalContainer;

  const modalClassName = `${styles.modalMask} ${
    modalType === "right-aligned" ? styles.rightAligned : ""
  }`;

  if (!show) return null;

  return (
    <div className={modalClassName} onClick={onBackDropClick}>
      <div
        className={modalContainerClassName}
        onClick={(e) => e.stopPropagation()}
      >
        <i
          className={`ion-android-close ${styles.modalClose}`}
          onClick={onClose}
        ></i>
        {children}
      </div>
    </div>
  );
};

export default Modal;
