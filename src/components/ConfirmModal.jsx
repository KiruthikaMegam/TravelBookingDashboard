import React from "react";

import "./ConfirmModal.css";

import closeIcon from "../assets/close.png";
import deleteIcon from "../assets/redDelete.png";
import warningIcon from "../assets/warning.png";

function ConfirmModal({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm = () => {},
  onCancel = () => {},
  type = "danger",
}) {
  if (!open) {
    return null;
  }

  const confirmType =
    type === "warning" ? "warning" : "danger";

  return (
    <div
      className="travel-modal-overlay"
      onClick={onCancel}
    >
      <div
        className="travel-confirm-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="travel-modal-close"
          onClick={onCancel}
          aria-label="Close confirmation dialog"
        >
          <img
            src={closeIcon}
            alt="Close"
          />
        </button>

        <div
          className={`travel-confirm-icon ${confirmType}`}
        >
          <img
            src={
              confirmType === "danger"
                ? deleteIcon
                : warningIcon
            }
            alt=""
          />
        </div>

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="travel-confirm-actions">
          <button
            type="button"
            className="travel-confirm-cancel"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className={`travel-confirm-submit ${confirmType}`}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;