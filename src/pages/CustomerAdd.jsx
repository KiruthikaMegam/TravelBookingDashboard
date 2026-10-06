import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import Toast from "../components/Toast";

import "./CustomerForm.css";

import customerIcon from "../assets/customer.png";
import arrowLeftIcon from "../assets/arrow-left.png";

function CustomerAdd() {
  const navigate = useNavigate();

  const { addCustomer } = useTravel();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    status: "Active",
    address: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  /* =========================
     HANDLE CHANGE
  ========================= */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  /* =========================
     VALIDATION
  ========================= */

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name =
        "Customer name is required.";
    }

    if (!formData.email) {
      newErrors.email =
        "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.phone) {
      newErrors.phone =
        "Phone number is required.";
    } else if (
      !/^[0-9]{10}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone =
        "Phone number must contain 10 digits.";
    }

    if (!formData.city) {
      newErrors.city =
        "City is required.";
    }

    if (!formData.country) {
      newErrors.country =
        "Country is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setToast({
        show: true,
        type: "error",
        message:
          "Please correct the highlighted fields.",
      });

      return;
    }

    const newCustomer = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      country: formData.country,
      status: formData.status,
      address: formData.address,
      notes: formData.notes,
      createdAt: new Date()
        .toISOString()
        .split("T")[0],
    };

    addCustomer(newCustomer);

    setToast({
      show: true,
      type: "success",
      message:
        "Customer added successfully.",
    });

    setTimeout(() => {
      navigate("/Customers");
    }, 700);
  };

  return (
    <div className="customer-form-page">

      <Topbar />

      <div className="customer-form-content">

        {/* HEADER */}

        <div className="customer-form-header">

          <button
            type="button"
            className="customer-form-back"
            onClick={() =>
              navigate("/Customers")
            }
          >
            <img
              src={arrowLeftIcon}
              alt=""
            />

            Back to Customers
          </button>

          <div className="customer-form-heading">

            <div className="customer-form-title-icon">
              <img
                src={customerIcon}
                alt=""
              />
            </div>

            <div>
              <h1>
                Add Customer
              </h1>

              <p>
                Add a new customer to your
                Travelia customer list.
              </p>
            </div>

          </div>

        </div>

        {/* FORM */}

        <form
          className="customer-form-card"
          onSubmit={handleSubmit}
        >

          {/* PERSONAL INFORMATION */}

          <div className="customer-form-section">

            <div className="customer-form-section-heading">

              <div>
                <h2>
                  Personal Information
                </h2>

                <p>
                  Enter the customer's basic
                  information.
                </p>
              </div>

            </div>

            <div className="customer-form-row">

              {/* NAME */}

              <div className="customer-form-group">

                <label>
                  Full Name
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={
                    handleChange
                  }
                  placeholder="Enter full name"
                  className={
                    errors.name
                      ? "input-error"
                      : ""
                  }
                />

                {errors.name && (
                  <small>
                    {errors.name}
                  </small>
                )}

              </div>

              {/* EMAIL */}

              <div className="customer-form-group">

                <label>
                  Email Address
                  <span>*</span>
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={
                    handleChange
                  }
                  placeholder="Enter email address"
                  className={
                    errors.email
                      ? "input-error"
                      : ""
                  }
                />

                {errors.email && (
                  <small>
                    {errors.email}
                  </small>
                )}

              </div>

            </div>

            <div className="customer-form-row">

              {/* PHONE */}

              <div className="customer-form-group">

                <label>
                  Phone Number
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={
                    handleChange
                  }
                  placeholder="Enter 10 digit phone number"
                  maxLength="10"
                  className={
                    errors.phone
                      ? "input-error"
                      : ""
                  }
                />

                {errors.phone && (
                  <small>
                    {errors.phone}
                  </small>
                )}

              </div>

              {/* STATUS */}

              <div className="customer-form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={
                    handleChange
                  }
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

              </div>

            </div>

          </div>

          {/* LOCATION */}

          <div className="customer-form-section">

            <div className="customer-form-section-heading">

              <div>
                <h2>
                  Location Information
                </h2>

                <p>
                  Enter the customer's
                  location details.
                </p>
              </div>

            </div>

            <div className="customer-form-row">

              {/* CITY */}

              <div className="customer-form-group">

                <label>
                  City
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={
                    handleChange
                  }
                  placeholder="Enter city"
                  className={
                    errors.city
                      ? "input-error"
                      : ""
                  }
                />

                {errors.city && (
                  <small>
                    {errors.city}
                  </small>
                )}

              </div>

              {/* COUNTRY */}

              <div className="customer-form-group">

                <label>
                  Country
                  <span>*</span>
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={
                    handleChange
                  }
                  placeholder="Enter country"
                  className={
                    errors.country
                      ? "input-error"
                      : ""
                  }
                />

                {errors.country && (
                  <small>
                    {errors.country}
                  </small>
                )}

              </div>

            </div>

            {/* ADDRESS */}

            <div className="customer-form-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={
                  handleChange
                }
                placeholder="Enter complete address"
                rows="4"
              />

            </div>

          </div>

          {/* NOTES */}

          <div className="customer-form-section">

            <div className="customer-form-section-heading">

              <div>
                <h2>
                  Additional Information
                </h2>

                <p>
                  Add optional notes about
                  this customer.
                </p>
              </div>

            </div>

            <div className="customer-form-group">

              <label>
                Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={
                  handleChange
                }
                placeholder="Enter notes"
                rows="4"
              />

            </div>

          </div>

          {/* ACTIONS */}

          <div className="customer-form-actions">

            <button
              type="button"
              className="customer-cancel-button"
              onClick={() =>
                navigate("/Customers")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="customer-submit-button"
            >
              Add Customer
            </button>

          </div>

        </form>

      </div>

      {/* TOAST */}

      <Toast
        show={toast.show}
        type={toast.type}
        message={toast.message}
        onClose={() =>
          setToast({
            show: false,
            type: "",
            message: "",
          })
        }
      />

    </div>
  );
}

export default CustomerAdd;