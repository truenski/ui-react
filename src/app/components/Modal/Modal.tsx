// components/Modal.js
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./modal.scss";

const Modal = ({
  closeOnBackdropClick = true,
  show,
  onClose,
  fullWidth = false,
  modalType = "centered",
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (show && e.keyCode === 27) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onClose]);

  const close = () => {
    onClose();
  };

  const onBackDropClick = () => {
    if (closeOnBackdropClick) {
      onClose();
    }
  };

  const modalContainerClassName = fullWidth
    ? "modal-container modal-container--full-width"
    : "modal-container";

  const modalClassNameMap = {
    centered: "",
    "right-aligned": "right-aligned",
  };

  const modalClassName = `modal-mask ${modalClassNameMap[modalType] || ""}`;

  return (
    show && (
      <div className={modalClassName} onClick={onBackDropClick}>
        <div
          className={modalContainerClassName}
          onClick={(e) => e.stopPropagation()}
        >
          <i className="ion-android-close modal--close" onClick={close}></i>
          {children}
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  closeOnBackdropClick: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fullWidth: PropTypes.bool,
  modalType: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
