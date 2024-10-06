import React, { useEffect } from "react";
import Image from "next/image";

interface ModalHeaderProps {
  headerTitle?: string;
  headerContent?: string;
  headerImage?: string;
  children?: React.ReactNode;
}

interface ModalProps {
  closeOnBackdropClick?: boolean;
  show: boolean;
  onClose: () => void;
  fullWidth?: boolean;
  modalType?: "centered" | "right-aligned";
  children: React.ReactNode;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  headerTitle = "",
  headerContent = "",
  headerImage = "",
  children,
}) => {
  return (
    <div className="column page-top-bar">
      {headerImage && <Image src={headerImage} alt="No image" />}
      <h2 className="page-sub-title">{headerTitle}</h2>
      {headerContent && <p className="small-12 column">{headerContent}</p>}
      {children}
    </div>
  );
};

export const Modal: React.FC<ModalProps> = ({
  closeOnBackdropClick = true,
  show,
  onClose,
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

  const modalContainerClassName = `modal-container ${
    fullWidth ? "modal-container--full-width" : ""
  }`;
  const modalClassName = `modal-mask ${
    modalType === "right-aligned" ? "right-aligned" : ""
  }`;

  return (
    <div
      className={modalClassName}
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div
        className={modalContainerClassName}
        onClick={(e) => e.stopPropagation()}
      >
        <i className="ion-android-close modal--close" onClick={onClose}></i>
        {children}
      </div>
    </div>
  );
};
