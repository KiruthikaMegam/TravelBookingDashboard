import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "./Topbar.css";

import menuIcon from "../assets/menu.png";
import closeIcon from "../assets/close.png";

function Topbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/Dashboard",
    },
    {
      title: "Destinations",
      path: "/Destinations",
    },
    {
      title: "Trips",
      path: "/Trips",
    },
    {
      title: "Bookings",
      path: "/Bookings",
    },
    {
      title: "Customers",
      path: "/Customers",
    },
    {
      title: "Payments",
      path: "/Payments",
    },
    {
      title: "Calendar",
      path: "/Calendar",
    },
    {
      title: "Analytics",
      path: "/Analytics",
    },
    {
      title: "Contact",
      path: "/ContactUs",
    },
  ];

  const handleBrandClick = () => {
    navigate("/dashboard");
    setMobileMenuOpen(false);
  };

  const handleMenuClick = () => {
    setMobileMenuOpen(false);
  };

  const handleMobileMenu = () => {
    setMobileMenuOpen((previous) => !previous);
  };

  return (
    <header className="travel-topbar">

      {/* BRAND */}
      <div
        className="travel-topbar-brand"
        onClick={handleBrandClick}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleBrandClick();
          }
        }}
      >
        <div className="travel-logo">
          TrAvEliA
        </div>

        <span className="travel-logo-subtitle">
          TRAVEL & BOOKING
        </span>
      </div>

      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        className="travel-mobile-menu-button"
        onClick={handleMobileMenu}
        aria-label={
          mobileMenuOpen
            ? "Close navigation menu"
            : "Open navigation menu"
        }
        aria-expanded={mobileMenuOpen}
      >
        <img
          src={
            mobileMenuOpen
              ? closeIcon
              : menuIcon
          }
          alt=""
        />
      </button>

      {/* NAVIGATION */}
      <nav
        className={
          mobileMenuOpen
            ? "travel-topbar-navigation mobile-open"
            : "travel-topbar-navigation"
        }
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={handleMenuClick}
            className={({ isActive }) =>
              isActive
                ? "travel-topbar-link active"
                : "travel-topbar-link"
            }
          >
            <span className="travel-topbar-title">
              {item.title}
            </span>
          </NavLink>
        ))}
      </nav>

    </header>
  );
}

export default Topbar;