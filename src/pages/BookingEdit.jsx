import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Loader from "../components/Loader";
import Toast from "../components/Toast";
import ErrorState from "../components/ErrorState";

import "./BookingForm.css";

import bookingIcon from "../assets/booking.png";
import arrowLeftIcon from "../assets/arrow-left.png";

function BookingEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    bookings,
    customers,
    trips,
    updateBooking,
  } = useTravel();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      let selectedBooking = null;

      for (const item of bookings) {
        if (Number(item.id) === Number(id)) {
          selectedBooking = item;
          break;
        }
      }

      setBooking(selectedBooking);

      if (selectedBooking) {
        setFormData({
          customerId:
            selectedBooking.customerId || "",
          tripId:
            selectedBooking.tripId || "",
          bookingDate:
            selectedBooking.bookingDate ||
            selectedBooking.date ||
            "",
          travelDate:
            selectedBooking.travelDate || "",
          passengers:
            selectedBooking.passengers || 1,
          totalAmount:
            selectedBooking.totalAmount || "",
          status:
            selectedBooking.status || "Pending",
          paymentStatus:
            selectedBooking.paymentStatus || "Pending",
          notes:
            selectedBooking.notes || "",
        });
      }

      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [bookings, id]);

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
      newErrors.bookingDate =
        "Please select booking date.";
    }

    if (!formData.travelDate) {
      newErrors.travelDate =
        "Please select travel date.";
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

    updateBooking(Number(id), {
      customerId: Number(formData.customerId),
      tripId: Number(formData.tripId),
      bookingDate: formData.bookingDate,
      travelDate: formData.travelDate,
      passengers: Number(formData.passengers),
      totalAmount: Number(formData.totalAmount),
      status: formData.status,
      paymentStatus: formData.paymentStatus,
      notes: formData.notes,
    });

    setToast({
      show: true,
      type: "success",
      message: "Booking updated successfully.",
    });

    setTimeout(() => {
      navigate(`/Bookings/view/${id}`);
    }, 800);
  };

  if (loading) {
    return (
      <Loader
        message="Loading booking..."
        description="Please wait while we prepare the booking form."
      />
    );
  }

  if (!booking) {
    return (
      <ErrorState
        title="Booking not found"
        message="The booking you are trying to edit does not exist."
        buttonText="Back to Bookings"
        onRetry={() => navigate("/Bookings")}
      />
    );
  }

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
              <h1>Edit Booking</h1>
              <p>
                Update booking information.
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
                Update the customer and trip details.
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
                Update passengers, payment and booking status.
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
                Update additional booking information.
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
              onClick={() =>
                navigate(`/Bookings/view/${id}`)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="booking-submit-button"
            >
              Update Booking
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

export default BookingEdit;