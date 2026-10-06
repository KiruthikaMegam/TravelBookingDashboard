import React from "react";

import "./ErrorState.css";

import errorIcon from "../assets/error.png";

function ErrorState({
  title = "Something went wrong",
  message = "We were unable to load the information.",
  buttonText = "Try Again",
  onRetry,
}) {
  return (
    <div className="travel-error-state">
      <div className="travel-error-icon">
        <img
          src={errorIcon}
          alt=""
        />
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
        >
          {buttonText}
        </button>
      ) : null}
    </div>
  );
}

export default ErrorState;