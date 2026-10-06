import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

import "./PaymentForm.css";

import paymentIcon from "../assets/payment.png";
import arrowLeft from "../assets/arrow-left.png";

function PaymentEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    payments,
    bookings,
    customers,
    updatePayment,
  } = useTravel();

  const [formData, setFormData] = useState({
    bookingId: "",
    customerId: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "Card",
    status: "Paid",
    transactionId: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [paymentFound, setPaymentFound] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      let selectedPayment = null;

      for (const payment of payments) {
        if (Number(payment.id) === Number(id)) {
          selectedPayment = payment;
          break;
        }
      }

      if (!selectedPayment) {
        setPaymentFound(false);
        setLoading(false);
        return;
      }

      setFormData({
        bookingId:
          selectedPayment.bookingId !== undefined
            ? String(selectedPayment.bookingId)
            : "",

        customerId:
          selectedPayment.customerId !== undefined
            ? String(selectedPayment.customerId)
            : "",

        amount:
          selectedPayment.amount !== undefined
            ? String(selectedPayment.amount)
            : "",

        paymentDate:
          selectedPayment.paymentDate ||
          selectedPayment.date ||
          "",

        paymentMethod:
          selectedPayment.paymentMethod ||
          "Card",

        status:
          selectedPayment.status ||
          "Paid",

        transactionId:
          selectedPayment.transactionId ||
          "",

        notes:
          selectedPayment.notes ||
          "",
      });

      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [payments, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const getCustomerName = (customerId) => {
    for (const customer of customers) {
      if (Number(customer.id) === Number(customerId)) {
        return (
          customer.name ||
          customer.fullName ||
          "Customer"
        );
      }
    }

    return "Customer";
  };

  const getBookingLabel = (bookingId) => {
    for (const booking of bookings) {
      if (Number(booking.id) === Number(bookingId)) {
        return (
          booking.bookingId ||
          `BK-${booking.id}`
        );
      }
    }

    return `Booking ${bookingId}`;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.bookingId) {
      newErrors.bookingId = "Please select a booking.";
    }

    if (!formData.customerId) {
      newErrors.customerId = "Please select a customer.";
    }

    if (!formData.amount) {
      newErrors.amount = "Please enter payment amount.";
    } else if (Number(formData.amount) <= 0) {
      newErrors.amount =
        "Amount must be greater than 0.";
    }

    if (!formData.paymentDate) {
      newErrors.paymentDate =
        "Please select payment date.";
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod =
        "Please select payment method.";
    }

    if (!formData.transactionId) {
      newErrors.transactionId =
        "Please enter transaction ID.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updatedPayment = {
      bookingId: Number(formData.bookingId),
      customerId: Number(formData.customerId),
      customerName: getCustomerName(
        formData.customerId
      ),
      bookingNumber: getBookingLabel(
        formData.bookingId
      ),
      amount: Number(formData.amount),
      paymentDate: formData.paymentDate,
      paymentMethod: formData.paymentMethod,
      status: formData.status,
      transactionId: formData.transactionId,
      notes: formData.notes,
    };

    updatePayment(
      Number(id),
      updatedPayment
    );

    setToast({
      show: true,
      type: "success",
      message: "Payment updated successfully.",
    });

    setTimeout(() => {
      navigate(`/Payments/view/${id}`);
    }, 800);
  };

  if (loading) {
    return (
      <div className="payment-form-page">
        <Topbar />

        <Loader
          message="Loading payment..."
          description="Please wait while payment details are loaded."
        />
      </div>
    );
  }

  if (!paymentFound) {
    return (
      <div className="payment-form-page">
        <Topbar />

        <div className="payment-form-content">
          <div className="payment-not-found">
            <div className="payment-not-found-icon">
              !
            </div>

            <h2>Payment Not Found</h2>

            <p>
              The payment you are trying to edit
              does not exist.
            </p>

            <button
              type="button"
              onClick={() => navigate("/Payments")}
            >
              Back to Payments
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-form-page">
      <Topbar />

      <div className="payment-form-content">

        <div className="payment-form-header">

          <button
            type="button"
            className="payment-back-button"
            onClick={() => navigate("/Payments")}
          >
            <img
              src={arrowLeft}
              alt="Back"
            />

            Back to Payments
          </button>

          <div className="payment-title-area">

            <div className="payment-title-icon">
              <img
                src={paymentIcon}
                alt="Payment"
              />
            </div>

            <div>
              <h1>Edit Payment</h1>

              <p>
                Update payment information
              </p>
            </div>

          </div>
        </div>

        <form
          className="payment-form-card"
          onSubmit={handleSubmit}
        >

          {/* PAYMENT INFORMATION */}

          <div className="payment-form-section">

            <div className="payment-section-title">
              <h2>
                Payment Information
              </h2>

              <p>
                Update the basic payment details.
              </p>
            </div>

            <div className="payment-form-row">

              <div className="payment-form-group">

                <label>
                  Booking <span>*</span>
                </label>

                <select
                  name="bookingId"
                  value={formData.bookingId}
                  onChange={handleChange}
                >
                  <option value="">
                    Select Booking
                  </option>

                  {bookings.map((booking) => (
                    <option
                      key={booking.id}
                      value={booking.id}
                    >
                      {booking.bookingId ||
                        `BK-${booking.id}`}
                    </option>
                  ))}
                </select>

                {errors.bookingId && (
                  <small className="payment-error">
                    {errors.bookingId}
                  </small>
                )}

              </div>

              <div className="payment-form-group">

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
                  <small className="payment-error">
                    {errors.customerId}
                  </small>
                )}

              </div>

            </div>

            <div className="payment-form-row">

              <div className="payment-form-group">

                <label>
                  Amount <span>*</span>
                </label>

                <div className="payment-input-with-prefix">

                  <span>₹</span>

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="Enter payment amount"
                    min="1"
                  />

                </div>

                {errors.amount && (
                  <small className="payment-error">
                    {errors.amount}
                  </small>
                )}

              </div>

              <div className="payment-form-group">

                <label>
                  Payment Date <span>*</span>
                </label>

                <input
                  type="date"
                  name="paymentDate"
                  value={formData.paymentDate}
                  onChange={handleChange}
                />

                {errors.paymentDate && (
                  <small className="payment-error">
                    {errors.paymentDate}
                  </small>
                )}

              </div>

            </div>

          </div>

          {/* TRANSACTION DETAILS */}

          <div className="payment-form-section">

            <div className="payment-section-title">

              <h2>
                Transaction Details
              </h2>

              <p>
                Update payment method and
                transaction information.
              </p>

            </div>

            <div className="payment-form-row">

              <div className="payment-form-group">

                <label>
                  Payment Method <span>*</span>
                </label>

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="Card">
                    Card
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Cash">
                    Cash
                  </option>

                  <option value="Net Banking">
                    Net Banking
                  </option>

                  <option value="Bank Transfer">
                    Bank Transfer
                  </option>
                </select>

              </div>

              <div className="payment-form-group">

                <label>
                  Payment Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                  <option value="Failed">
                    Failed
                  </option>

                  <option value="Refunded">
                    Refunded
                  </option>

                  <option value="Partial">
                    Partial
                  </option>
                </select>

              </div>

            </div>

            <div className="payment-form-row">

              <div className="payment-form-group">

                <label>
                  Transaction ID <span>*</span>
                </label>

                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  placeholder="Enter transaction ID"
                />

                {errors.transactionId && (
                  <small className="payment-error">
                    {errors.transactionId}
                  </small>
                )}

              </div>

              <div className="payment-form-group">

                <label>
                  Booking Reference
                </label>

                <input
                  type="text"
                  value={
                    formData.bookingId
                      ? getBookingLabel(
                          formData.bookingId
                        )
                      : ""
                  }
                  placeholder="Booking reference"
                  readOnly
                />

              </div>

            </div>

          </div>

          {/* NOTES */}

          <div className="payment-form-section">

            <div className="payment-section-title">

              <h2>
                Additional Information
              </h2>

              <p>
                Update optional payment notes.
              </p>

            </div>

            <div className="payment-form-group full-width">

              <label>
                Notes
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Enter payment notes..."
                rows="5"
              />

            </div>

          </div>

          {/* ACTIONS */}

          <div className="payment-form-actions">

            <button
              type="button"
              className="payment-cancel-button"
              onClick={() =>
                navigate("/Payments")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="payment-save-button"
            >
              Update Payment
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

export default PaymentEdit;