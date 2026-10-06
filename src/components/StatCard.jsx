import React from "react";

import "./StatCard.css";

function StatCard({
  title = "",
  value = "0",
  icon,
  change = "",
  changeType = "positive",
  description = "",
}) {
  return (
    <div className="travel-stat-card">
      <div className="travel-stat-card-top">
        <div className="travel-stat-card-icon">
          {icon ? (
            <img
              src={icon}
              alt=""
            />
          ) : null}
        </div>

        {change ? (
          <span
            className={`travel-stat-change ${changeType}`}
          >
            {change}
          </span>
        ) : null}
      </div>

      <div className="travel-stat-content">
        <p className="travel-stat-title">
          {title}
        </p>

        <h3 className="travel-stat-value">
          {value}
        </h3>

        {description ? (
          <p className="travel-stat-description">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default StatCard;