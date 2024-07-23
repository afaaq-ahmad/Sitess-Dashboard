import React, { useEffect } from "react";
import Styles from "./styles.module.css";

const Modal = ({ children, isOpen, onClose, position }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`${Styles.modalOverlay} ${
        position === "center" ? Styles.centerAlign : Styles.topAlign
      }`}
      onClick={onClose}
    >
      <div
        className={`${Styles.modalContent} ${
          position === "center" ? Styles.center : Styles.top
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={Styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
