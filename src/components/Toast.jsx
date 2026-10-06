import React, { useEffect } from "react";

import "./Toast.css";

import checkIcon from "../assets/check.png";
import errorIcon from "../assets/error.png";
import warningIcon from "../assets/warning.png";
import infoIcon from "../assets/info.png";
import closeIcon from "../assets/close.png";

function Toast({
  message = "",
  type = "success",
  onClose = () => {},
  duration = 3500,
}) {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [message, duration, onClose]);

  if (!message) {
    return null;
  }

  let icon = checkIcon;

  if (type === "error") {
    icon = errorIcon;
  }

  if (type === "warning") {
    icon = warningIcon;
  }

  if (type === "info") {
    icon = infoIcon;
  }

  return (
    <div className={`travel-toast ${type}`}>
      <div className="travel-toast-icon">
        <img src={icon} alt="" />
      </div>

      <p>{message}</p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
      >
        <img src={closeIcon} alt="Close" />
      </button>
    </div>
  );
}

export default Toast;