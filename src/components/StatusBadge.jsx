import React from "react";

import "./StatusBadge.css";

function StatusBadge({ status = "" }) {
  const statusValue = String(status);
  const value = statusValue.toLowerCase();

  const getStatusClass = () => {
    if (
      value === "active" ||
      value === "confirmed" ||
      value === "paid" ||
      value === "completed" ||
      value === "success"
    ) {
      return "success";
    }

    if (
      value === "pending" ||
      value === "processing" ||
      value === "in progress" ||
      value === "partial"
    ) {
      return "warning";
    }

    if (
      value === "cancelled" ||
      value === "failed" ||
      value === "inactive" ||
      value === "breached"
    ) {
      return "danger";
    }

    if (value === "refunded") {
      return "info";
    }

    return "default";
  };

  return (
    <span
      className={`travel-status-badge ${getStatusClass()}`}
    >
      <span className="travel-status-dot"></span>

      {statusValue || "Unknown"}
    </span>
  );
}

export default StatusBadge;