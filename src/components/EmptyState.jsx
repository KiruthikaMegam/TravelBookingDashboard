import React from "react";

import "./EmptyState.css";

import searchIcon from "../assets/search.png";

function EmptyState({
  icon = searchIcon,
  title = "No information found",
  message = "There is no information to display right now.",
  buttonText = "",
  onAction,
}) {
  return (
    <div className="travel-empty-state">
      <div className="travel-empty-icon">
        <img
          src={icon}
          alt=""
        />
      </div>

      <h3>{title}</h3>

      <p>{message}</p>

      {buttonText && onAction ? (
        <button
          type="button"
          onClick={onAction}
        >
          {buttonText}
        </button>
      ) : null}
    </div>
  );
}

export default EmptyState;