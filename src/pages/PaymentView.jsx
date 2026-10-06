import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";
import StatusBadge from "../components/StatusBadge";

import "./PaymentView.css";

import paymentIcon from "../assets/payment.png";
import arrowLeft from "../assets/arrow-left.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/redDelete.png";
import customerIcon from "../assets/customer.png";
import Transaction from "../assets/transaction.png";
import bookingIcon from "../assets/booking.png";
import priceIcon from "../assets/totalAmount.png";
import Notes from "../assets/notes.png";


function PaymentView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    payments,
    bookings,
    customers,
    deletePayment,
  } = useTravel();

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [loading] = useState(false);

  let payment = null;

  for (const item of payments) {
    if (Number(item.id) === Number(id)) {
      payment = item;
      break;
    }
  }

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

  const getCustomerEmail = (customerId) => {
    for (const customer of customers) {
      if (Number(customer.id) === Number(customerId)) {
        return customer.email || "-";
      }
    }

    return "-";
  };

  const getCustomerPhone = (customerId) => {
    for (const customer of customers) {
      if (Number(customer.id) === Number(customerId)) {
        return (
          customer.phone ||
          customer.mobile ||
          customer.mobileNumber ||
          "-"
        );
      }
    }

    return "-";
  };

  const getBookingNumber = (bookingId) => {
    for (const booking of bookings) {
      if (Number(booking.id) === Number(bookingId)) {
        return (
          booking.bookingId ||
          `BK-${booking.id}`
        );
      }
    }

    return `BK-${bookingId}`;
  };

  const getBookingTrip = (bookingId) => {
    for (const booking of bookings) {
      if (Number(booking.id) === Number(bookingId)) {
        return (
          booking.tripName ||
          booking.tripTitle ||
          "-"
        );
      }
    }

    return "-";
  };

  const formatAmount = (amount) => {
    const value = Number(amount);

    if (Number.isNaN(value)) {
      return "0";
    }

    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleDeleteConfirm = () => {
    if (!payment) {
      return;
    }

    deletePayment(Number(payment.id));

    setShowDeleteModal(false);

    setToast({
      show: true,
      type: "success",
      message: "Payment deleted successfully.",
    });

    setTimeout(() => {
      navigate("/Payments");
    }, 800);
  };

  if (loading) {
    return (
      <div className="payment-view-page">
        <Topbar />

        <Loader
          message="Loading payment..."
          description="Please wait while payment details are loaded."
        />
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="payment-view-page">
        <Topbar />

        <div className="payment-view-content">

          <div className="payment-view-not-found">

            <div className="payment-view-not-found-icon">
              !
            </div>

            <h2>Payment Not Found</h2>

            <p>
              The payment you are trying to view
              does not exist or may have been
              deleted.
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

  const customerName =
    payment.customerName ||
    getCustomerName(payment.customerId);

  const customerEmail =
    getCustomerEmail(payment.customerId);

  const customerPhone =
    getCustomerPhone(payment.customerId);

  const bookingNumber =
    payment.bookingNumber ||
    getBookingNumber(payment.bookingId);

  const bookingTrip =
    payment.tripName ||
    payment.tripTitle ||
    getBookingTrip(payment.bookingId);

  const paymentDate =
    payment.paymentDate ||
    payment.date ||
    "";

  const paymentMethod =
    payment.paymentMethod ||
    payment.method ||
    "Unknown";

  const paymentStatus =
    payment.status ||
    "Pending";

  return (
    <div className="payment-view-page">

      <Topbar />

      <div className="payment-view-content">

        {/* HEADER */}

        <div className="payment-view-header">

          <button
            type="button"
            className="payment-view-back"
            onClick={() => navigate("/Payments")}
          >
            <img
              src={arrowLeft}
              alt="Back"
            />

            Back to Payments
          </button>

          <div className="payment-view-heading">

            <div className="payment-view-title-icon">
              <img
                src={paymentIcon}
                alt="Payment"
              />
            </div>

            <div>
              <h1>
                {payment.paymentId ||
                  `PAY-${payment.id}`}
              </h1>

              <p>
                Payment transaction details
              </p>
            </div>

          </div>

          <div className="payment-view-actions">

            <button
              type="button"
              className="payment-view-edit"
              onClick={() =>
                navigate(
                  `/Payments/edit/${payment.id}`
                )
              }
            >
              <img
                src={editIcon}
                alt="Edit"
              />

              Edit
            </button>

            <button
              type="button"
              className="payment-view-delete"
              onClick={() =>
                setShowDeleteModal(true)
              }
            >
              <img
                src={deleteIcon}
                alt="Delete"
              />

              Delete
            </button>

          </div>

        </div>

        {/* PAYMENT SUMMARY */}

        <div className="payment-summary-card">

          <div className="payment-summary-left">

            <div className="payment-summary-icon">
              <img
                src={priceIcon}
                alt="Payment"
              />
            </div>

            <div>
              <span>Payment Amount</span>

              <strong>
                ₹{formatAmount(payment.amount)}
              </strong>
            </div>

          </div>

          <div className="payment-summary-right">

            <div className="payment-summary-item">
              <span>Status</span>

              <StatusBadge
                status={paymentStatus}
              />
            </div>

            <div className="payment-summary-item">
              <span>Payment Date</span>

              <strong>
                {formatDate(paymentDate)}
              </strong>
            </div>

            <div className="payment-summary-item">
              <span>Method</span>

              <strong>
                {paymentMethod}
              </strong>
            </div>

          </div>

        </div>

        {/* MAIN CONTENT */}

        <div className="payment-view-layout">

          {/* CUSTOMER */}

          <div className="payment-detail-card">

            <div className="payment-detail-card-header">

              <div className="payment-detail-card-icon">
                <img
                  src={customerIcon}
                  alt="Customer"
                />
              </div>

              <div>
                <h2>Customer Information</h2>
                <p>
                  Customer associated with
                  this payment
                </p>
              </div>

            </div>

            <div className="payment-detail-list">

              <div className="payment-detail-row">

                <span>Customer Name</span>

                <strong>
                  {customerName}
                </strong>

              </div>

              <div className="payment-detail-row">

                <span>Email</span>

                <strong>
                  {customerEmail}
                </strong>

              </div>

              <div className="payment-detail-row">

                <span>Phone</span>

                <strong>
                  {customerPhone}
                </strong>

              </div>

            </div>

          </div>

          {/* BOOKING */}

          <div className="payment-detail-card">

            <div className="payment-detail-card-header">

              <div className="payment-detail-card-icon">
                <img
                  src={bookingIcon}
                  alt="Booking"
                />
              </div>

              <div>
                <h2>Booking Information</h2>
                <p>
                  Booking associated with
                  this payment
                </p>
              </div>

            </div>

            <div className="payment-detail-list">

              <div className="payment-detail-row">

                <span>Booking ID</span>

                <strong className="payment-purple-text">
                  {bookingNumber}
                </strong>

              </div>

              <div className="payment-detail-row">

                <span>Trip</span>

                <strong>
                  {bookingTrip}
                </strong>

              </div>

              <div className="payment-detail-row">

                <span>Booking Reference</span>

                <strong>
                  {payment.bookingId || "-"}
                </strong>

              </div>

            </div>

          </div>

          {/* TRANSACTION */}

          <div className="payment-detail-card payment-full-card">

            <div className="payment-detail-card-header">

              <div className="payment-detail-card-icon">
                <img
                  src={Transaction}
                  alt="Transaction"
                />
              </div>

              <div>
                <h2>Transaction Details</h2>
                <p>
                  Complete payment transaction
                  information
                </p>
              </div>

            </div>

            <div className="payment-transaction-details">

              <div className="payment-transaction-item">

                <span>Payment ID</span>

                <strong>
                  {payment.paymentId ||
                    `PAY-${payment.id}`}
                </strong>

              </div>

              <div className="payment-transaction-item">

                <span>Transaction ID</span>

                <strong>
                  {payment.transactionId ||
                    "-"}
                </strong>

              </div>

              <div className="payment-transaction-item">

                <span>Amount</span>

                <strong className="payment-amount-large">
                  ₹{formatAmount(payment.amount)}
                </strong>

              </div>

              <div className="payment-transaction-item">

                <span>Payment Method</span>

                <strong>
                  {paymentMethod}
                </strong>

              </div>

              <div className="payment-transaction-item">

                <span>Payment Date</span>

                <strong>
                  {formatDate(paymentDate)}
                </strong>

              </div>

              <div className="payment-transaction-item">

                <span>Status</span>

                <StatusBadge
                  status={paymentStatus}
                />

              </div>

            </div>

          </div>

          {/* NOTES */}

          <div className="payment-detail-card payment-full-card">

            <div className="payment-detail-card-header">

              <div className="payment-detail-card-icon">
                <img
                  src={Notes}
                  alt="Notes"
                />
              </div>

              <div>
                <h2>Additional Notes</h2>
                <p>
                  Notes related to this payment
                </p>
              </div>

            </div>

            <div className="payment-notes">

              {payment.notes ? (
                <p>{payment.notes}</p>
              ) : (
                <p className="payment-no-notes">
                  No additional notes available
                  for this payment.
                </p>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* DELETE CONFIRMATION */}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Payment"
        message={`Are you sure you want to delete ${
          payment.paymentId ||
          `PAY-${payment.id}`
        }? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() =>
          setShowDeleteModal(false)
        }
      />

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

export default PaymentView;