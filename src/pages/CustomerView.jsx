import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";
import StatusBadge from "../components/StatusBadge";

import "./CustomerView.css";

import customerIcon from "../assets/customer.png";
import bookingIcon from "../assets/booking.png";
import calendarIcon from "../assets/calendar.png";
import viewIcon from "../assets/view.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/redDelete.png";
import arrowLeftIcon from "../assets/arrow-left.png";
import Contact from "../assets/contact.png";
import Notes from "../assets/notes.png";


function CustomerView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    customers,
    bookings,
    deleteCustomer,
  } = useTravel();

  const [loading, setLoading] =
    useState(true);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [customer, setCustomer] =
    useState(null);

  /* =========================
     LOADING
  ========================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      let selectedCustomer = null;

      for (const item of customers) {
        if (
          Number(item.id) ===
          Number(id)
        ) {
          selectedCustomer = item;
          break;
        }
      }

      setCustomer(
        selectedCustomer
      );

      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [customers, id]);

  /* =========================
     CUSTOMER BOOKINGS
  ========================= */

  const customerBookings = [];

  if (customer) {
    for (const booking of bookings) {
      if (
        Number(booking.customerId) ===
        Number(customer.id)
      ) {
        customerBookings.push(
          booking
        );
      }
    }
  }

  /* =========================
     DELETE
  ========================= */

  const handleDeleteConfirm = () => {
    if (!customer) {
      return;
    }

    deleteCustomer(
      Number(customer.id)
    );

    setShowDeleteModal(false);

    setToast({
      show: true,
      type: "success",
      message:
        "Customer deleted successfully.",
    });

    setTimeout(() => {
      navigate("/Customers");
    }, 700);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <Loader
        message="Loading customer..."
        description="Please wait while we load the customer details."
      />
    );
  }

  /* =========================
     NOT FOUND
  ========================= */

  if (!customer) {
    return (
      <div className="customer-view-page">

        <Topbar />

        <div className="customer-view-content">

          <div className="customer-not-found">

            <div className="customer-not-found-icon">
              <img
                src={customerIcon}
                alt=""
              />
            </div>

            <h2>
              Customer Not Found
            </h2>

            <p>
              The customer you are looking
              for does not exist.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/Customers")
              }
            >
              Back to Customers
            </button>

          </div>

        </div>

      </div>
    );
  }

  const customerName =
    customer.name ||
    customer.fullName ||
    "Unknown Customer";

  const customerEmail =
    customer.email ||
    "No email available";

  const customerPhone =
    customer.phone ||
    customer.mobile ||
    customer.mobileNumber ||
    "No phone number";

  const customerCity =
    customer.city ||
    customer.location ||
    "Location not available";

  return (
    <div className="customer-view-page">

      {/* TOPBAR */}

      <Topbar />

      <div className="customer-view-content">

        {/* HEADER */}

        <div className="customer-view-header">

          <button
            type="button"
            className="customer-back-button"
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

          <div className="customer-view-actions">

            <button
              type="button"
              className="customer-edit-button"
              onClick={() =>
                navigate(
                  `/Customers/edit/${customer.id}`
                )
              }
            >
              <img
                src={editIcon}
                alt=""
              />

              Edit
            </button>

            <button
              type="button"
              className="customer-delete-button"
              onClick={() =>
                setShowDeleteModal(true)
              }
            >
              <img
                src={deleteIcon}
                alt=""
              />

              Delete
            </button>

          </div>

        </div>

        {/* CUSTOMER PROFILE */}

        <div className="customer-profile-card">

          <div className="customer-profile-main">

            <div className="customer-large-avatar">
              {customerName
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="customer-profile-heading">

              <div className="customer-profile-title-row">

                <h1>
                  {customerName}
                </h1>

                <StatusBadge
                  status={
                    customer.status ||
                    "Active"
                  }
                />

              </div>

              <p>
                {customerEmail}
              </p>

              <span>
                Customer ID:{" "}
                {customer.customerId ||
                  `CU-${customer.id}`}
              </span>

            </div>

          </div>

        </div>

        {/* INFORMATION CARDS */}

        <div className="customer-information">

          {/* CONTACT */}

          <div className="customer-detail-card">

            <div className="customer-detail-card-header">

              <div className="customer-detail-icon purple">
                <img
                  src={Contact}
                  alt=""
                />
              </div>

              <div>
                <h3>
                  Contact Information
                </h3>

                <p>
                  Customer contact details
                </p>
              </div>

            </div>

            <div className="customer-detail-list">

              <div className="customer-detail-row">

                <span>
                  Full Name
                </span>

                <strong>
                  {customerName}
                </strong>

              </div>

              <div className="customer-detail-row">

                <span>
                  Email
                </span>

                <strong>
                  {customerEmail}
                </strong>

              </div>

              <div className="customer-detail-row">

                <span>
                  Phone
                </span>

                <strong>
                  {customerPhone}
                </strong>

              </div>

              <div className="customer-detail-row">

                <span>
                  Location
                </span>

                <strong>
                  {customerCity}
                </strong>

              </div>

            </div>

          </div>

          {/* CUSTOMER DETAILS */}

          <div className="customer-detail-card">

            <div className="customer-detail-card-header">

              <div className="customer-detail-icon blue">
                <img
                  src={Notes}
                  alt=""
                />
              </div>

              <div>
                <h3>
                  Customer Details
                </h3>

                <p>
                  Account information
                </p>
              </div>

            </div>

            <div className="customer-detail-list">

              <div className="customer-detail-row">

                <span>
                  Customer ID
                </span>

                <strong>
                  {customer.customerId ||
                    `CU-${customer.id}`}
                </strong>

              </div>

              <div className="customer-detail-row">

                <span>
                  Status
                </span>

                <StatusBadge
                  status={
                    customer.status ||
                    "Active"
                  }
                />

              </div>

              <div className="customer-detail-row">

                <span>
                  Date Joined
                </span>

                <strong>
                  {customer.createdAt ||
                    customer.joinDate ||
                    "2026"}
                </strong>

              </div>

              <div className="customer-detail-row">

                <span>
                  Total Bookings
                </span>

                <strong>
                  {customerBookings.length}
                </strong>

              </div>

            </div>

          </div>

        </div>

        {/* BOOKING SUMMARY */}

        <div className="customer-booking-section">

          <div className="customer-section-heading">

            <div>

              <h2>
                Booking History
              </h2>

              <p>
                Trips booked by this customer
              </p>

            </div>

            {/* <div className="customer-booking-count">

              <img
                src={bookingIcon}
                alt=""
              />

              {customerBookings.length}
            </div> */}

          </div>

          {customerBookings.length === 0 ? (

            <div className="customer-no-bookings">

              <img
                src={bookingIcon}
                alt=""
              />

              <h3>
                No bookings yet
              </h3>

              <p>
                This customer has not made
                any bookings.
              </p>

            </div>

          ) : (

            <div className="customer-booking-list">

              {customerBookings.map(
                (booking) => {

                  return (
                    <div
                      className="customer-booking-card"
                      key={booking.id}
                    >

                      <div className="customer-booking-left">

                        <div className="customer-booking-icon">
                          <img
                            src={bookingIcon}
                            alt=""
                          />
                        </div>

                        <div>

                          <span>
                            {booking.bookingId ||
                              `BK-${booking.id}`}
                          </span>

                          <h3>
                            {booking.travelDate ||
                              booking.bookingDate ||
                              "Travel date not available"}
                          </h3>

                        </div>

                      </div>

                      <div className="customer-booking-middle">

                        <div>
                          <span>
                            Amount
                          </span>

                          <strong>
                            $
                            {Number(
                              booking.totalAmount ||
                                0
                            ).toLocaleString()}
                          </strong>
                        </div>

                        <div>
                          <span>
                            Payment
                          </span>

                          <StatusBadge
                            status={
                              booking.paymentStatus ||
                              "Pending"
                            }
                          />
                        </div>

                        <div>
                          <span>
                            Booking
                          </span>

                          <StatusBadge
                            status={
                              booking.status ||
                              "Pending"
                            }
                          />
                        </div>

                      </div>

                      <button
                        type="button"
                        className="customer-booking-view"
                        onClick={() =>
                          navigate(
                            `/Bookings/view/${booking.id}`
                          )
                        }
                      >
                        <img
                          src={viewIcon}
                          alt=""
                        />

                        View
                      </button>

                    </div>
                  );
                }
              )}

            </div>

          )}

        </div>

      </div>

      {/* DELETE MODAL */}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Customer"
        message={`Are you sure you want to delete "${customerName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={
          handleDeleteConfirm
        }
        onCancel={
          handleDeleteCancel
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

export default CustomerView;