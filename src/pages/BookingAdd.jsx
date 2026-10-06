import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Toast from "../components/Toast";

import "./BookingForm.css";

import bookingIcon from "../assets/booking.png";
import arrowLeftIcon from "../assets/arrow-left.png";

function BookingAdd() {
  const navigate = useNavigate();

  const {
    addBooking,
    customers,
    trips,
  } = useTravel();

  const [formData, setFormData] = useState({
    customerId: "",
    tripId: "",
    bookingDate: "",
    travelDate: "",
    passengers: 1,
    totalAmount: "",
    status: "Pending",
    paymentStatus: "Pending",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customerId) {
      newErrors.customerId = "Please select a customer.";
    }

    if (!formData.tripId) {
      newErrors.tripId = "Please select a trip.";
    }

    if (!formData.bookingDate) {
      newErrors.bookingDate = "Please select booking date.";
    }

    if (!formData.travelDate) {
      newErrors.travelDate = "Please select travel date.";
    }

    if (
      !formData.passengers ||
      Number(formData.passengers) < 1
    ) {
      newErrors.passengers =
        "Passengers must be at least 1.";
    }

    if (
      formData.totalAmount === "" ||
      Number(formData.totalAmount) <= 0
    ) {
      newErrors.totalAmount =
        "Please enter a valid amount.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newBooking = {
      id: Date.now(),
      bookingId: `BK-${Date.now().toString().slice(-6)}`,
      customerId: Number(formData.customerId),
      tripId: Number(formData.tripId),
      bookingDate: formData.bookingDate,
      travelDate: formData.travelDate,
      passengers: Number(formData.passengers),
      totalAmount: Number(formData.totalAmount),
      status: formData.status,
      paymentStatus: formData.paymentStatus,
      notes: formData.notes,
    };

    addBooking(newBooking);

    setToast({
      show: true,
      type: "success",
      message: "Booking created successfully.",
    });

    setTimeout(() => {
      navigate("/Bookings");
    }, 800);
  };

  return (
    <div className="booking-form-page">

      <div className="booking-form-content">

        <div className="booking-form-header">

          <button
            type="button"
            className="booking-back-button"
            onClick={() => navigate("/Bookings")}
          >
            <img
              src={arrowLeftIcon}
              alt="Back"
            />
            Back to Bookings
          </button>

          <div className="booking-form-heading">

            <div className="booking-form-heading-icon">
              <img
                src={bookingIcon}
                alt=""
              />
            </div>

            <div>
              <h1>Add Booking</h1>
              <p>
                Create a new travel booking.
              </p>
            </div>

          </div>

        </div>

        <form
          className="booking-form-card"
          onSubmit={handleSubmit}
        >

          <div className="booking-form-section">

            <div className="booking-form-section-title">
              <h2>Booking Information</h2>
              <p>
                Select the customer and trip details.
              </p>
            </div>

            <div className="booking-form-fields">

              <div className="booking-form-group">
                <label>
                  Customer <span>*</span>
                </label>

                <select
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Customer
                  </option>

                  {customers.map((customer) => (
                    <option
                      key={customer.id}
                      value={customer.id}
                    >
                      {customer.name ||
                        customer.fullName ||
                        `Customer ${customer.id}`}
                    </option>
                  ))}
                </select>

                {errors.customerId && (
                  <small>{errors.customerId}</small>
                )}
              </div>

              <div className="booking-form-group">
                <label>
                  Trip <span>*</span>
                </label>

                <select
                  name="tripId"
                  value={formData.tripId}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Trip
                  </option>

                  {trips.map((trip) => (
                    <option
                      key={trip.id}
                      value={trip.id}
                    >
                      {trip.title}
                    </option>
                  ))}
                </select>

                {errors.tripId && (
                  <small>{errors.tripId}</small>
                )}
              </div>

              <div className="booking-form-group">
                <label>
                  Booking Date <span>*</span>
                </label>

                <input
                  type="date"
                  name="bookingDate"
                  value={formData.bookingDate}
                  onChange={handleChange}
                />

                {errors.bookingDate && (
                  <small>{errors.bookingDate}</small>
                )}
              </div>

              <div className="booking-form-group">
                <label>
                  Travel Date <span>*</span>
                </label>

                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                />

                {errors.travelDate && (
                  <small>{errors.travelDate}</small>
                )}
              </div>

            </div>

          </div>

          <div className="booking-form-section">

            <div className="booking-form-section-title">
              <h2>Payment & Status</h2>
              <p>
                Set passenger, payment and booking status.
              </p>
            </div>

            <div className="booking-form-fields">

              <div className="booking-form-group">
                <label>
                  Passengers <span>*</span>
                </label>

                <input
                  type="number"
                  min="1"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                />

                {errors.passengers && (
                  <small>{errors.passengers}</small>
                )}
              </div>

              <div className="booking-form-group">
                <label>
                  Total Amount <span>*</span>
                </label>

                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                />

                {errors.totalAmount && (
                  <small>{errors.totalAmount}</small>
                )}
              </div>

              <div className="booking-form-group">
                <label>Booking Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Confirmed">
                    Confirmed
                  </option>

                  <option value="Completed">
                    Completed
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>

              <div className="booking-form-group">
                <label>Payment Status</label>

                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                >
                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Partial">
                    Partial
                  </option>

                  <option value="Failed">
                    Failed
                  </option>

                  <option value="Refunded">
                    Refunded
                  </option>
                </select>
              </div>

            </div>

          </div>

          <div className="booking-form-section">

            <div className="booking-form-section-title">
              <h2>Additional Notes</h2>
              <p>
                Add any additional booking information.
              </p>
            </div>

            <div className="booking-form-group full-width">
              <label>Notes</label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter booking notes..."
                rows="5"
              />
            </div>

          </div>

          <div className="booking-form-actions">

            <button
              type="button"
              className="booking-cancel-button"
              onClick={() => navigate("/Bookings")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="booking-submit-button"
            >
              Create Booking
            </button>

          </div>

        </form>

      </div>

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

export default BookingAdd;