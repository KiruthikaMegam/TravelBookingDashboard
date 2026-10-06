import React from "react";

import "./Loader.css";

function Loader({
  message = "Loading...",
  description = "Please wait while we load the information.",
}) {
  return (
    <div className="travel-loader">
      <div className="travel-loader-spinner">
        <div className="travel-loader-inner"></div>
      </div>

      <h3>{message}</h3>

      <p>{description}</p>
    </div>
  );
}

export default Loader;