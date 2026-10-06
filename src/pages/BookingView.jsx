import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Loader from "../components/Loader";
import Toast from "../components/Toast";
import ErrorState from "../components/ErrorState";
import ConfirmModal from "../components/ConfirmModal";
import StatusBadge from "../components/StatusBadge";

import "./BookingView.css";

import bookingIcon from "../assets/booking.png";
import customerIcon from "../assets/customer.png";
import calendarIcon from "../assets/calendar.png";
import Revenue from "../assets/revenue.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/redDelete.png";
import arrowLeftIcon from "../assets/arrow-left.png";
import tripIcon from "../assets/topDestination.png";
import Notes from "../assets/notes.png";

function BookingView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    bookings,
    customers,
    trips,
    deleteBooking,
  } = useTravel();

  const [booking, setBooking] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [trip, setTrip] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

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

        for (const item of customers) {
          if (
            Number(item.id) ===
            Number(selectedBooking.customerId)
          ) {
            setCustomer(item);
            break;
          }
        }

        for (const item of trips) {
          if (
            Number(item.id) ===
            Number(selectedBooking.tripId)
          ) {
            setTrip(item);
            break;
          }
        }
      }

      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [bookings, customers, trips, id]);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    if (!booking) {
      return;
    }

    deleteBooking(Number(booking.id));

    setShowDeleteModal(false);

    setToast({
      show: true,
      type: "success",
      message: "Booking deleted successfully.",
    });

    setTimeout(() => {
      navigate("/Bookings");
    }, 800);
  };

  if (loading) {
    return (
      <Loader
        message="Loading booking..."
        description="Please wait while we prepare the booking details."
      />
    );
  }

  if (!booking) {
    return (
      <ErrorState
        title="Booking not found"
        message="The booking you are trying to view does not exist."
        buttonText="Back to Bookings"
        onRetry={() => navigate("/Bookings")}
      />
    );
  }

  const customerName =
    customer?.name ||
    customer?.fullName ||
    "Unknown Customer";

  const customerEmail =
    customer?.email ||
    "Not available";

  const customerPhone =
    customer?.phone ||
    customer?.mobile ||
    "Not available";

  const tripName =
    trip?.title ||
    "Unknown Trip";

  const destination =
    trip?.destination ||
    booking.destination ||
    "Not available";

  const bookingId =
    booking.bookingId ||
    `BK-${booking.id}`;

  return (
    <div className="booking-view-page">

      <div className="booking-view-content">

        {/* HEADER */}

        <div className="booking-view-header">

          <button
            type="button"
            className="booking-view-back"
            onClick={() => navigate("/Bookings")}
          >
            <img
              src={arrowLeftIcon}
              alt="Back"
            />
            Back to Bookings
          </button>

          <div className="booking-view-heading">

            <div className="booking-view-heading-left">

              <div className="booking-view-icon">
                <img
                  src={bookingIcon}
                  alt=""
                />
              </div>

              <div>
                <span>Booking Details</span>
                <h1>{bookingId}</h1>
              </div>

            </div>

            <div className="booking-view-actions">

              <button
                type="button"
                className="booking-edit-button"
                onClick={() =>
                  navigate(`/Bookings/edit/${booking.id}`)
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
                className="booking-delete-button"
                onClick={handleDeleteClick}
              >
                <img
                  src={deleteIcon}
                  alt=""
                />
                Delete
              </button>

            </div>

          </div>

        </div>

        {/* MAIN CARD */}

        <div className="booking-view-card">

          <div className="booking-view-status-row">

            <div>
              <span>Booking Status</span>

              <StatusBadge
                status={booking.status}
              />
            </div>

            <div>
              <span>Payment Status</span>

              <StatusBadge
                status={
                  booking.paymentStatus ||
                  "Pending"
                }
              />
            </div>

          </div>

          {/* CUSTOMER */}

          <div className="booking-view-section">

            <div className="booking-view-section-title">
              <img
                src={customerIcon}
                alt=""
              />

              <div>
                <h2>Customer Information</h2>
                <p>
                  Customer details for this booking.
                </p>
              </div>
            </div>

            <div className="booking-view-info-list">

              <div>
                <span>Name</span>
                <strong>{customerName}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{customerEmail}</strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>{customerPhone}</strong>
              </div>

            </div>

          </div>

          {/* TRIP */}

          <div className="booking-view-section">

            <div className="booking-view-section-title">
              <img
                src={tripIcon}
                alt=""
              />

              <div>
                <h2>Trip Information</h2>
                <p>
                  Trip details associated with this booking.
                </p>
              </div>
            </div>

            <div className="booking-view-info-list">

              <div>
                <span>Trip</span>
                <strong>{tripName}</strong>
              </div>

              <div>
                <span>Destination</span>
                <strong>{destination}</strong>
              </div>

              <div>
                <span>Category</span>
                <strong>
                  {trip?.category ||
                    "Not available"}
                </strong>
              </div>

            </div>

          </div>

          {/* BOOKING */}

          <div className="booking-view-section">

            <div className="booking-view-section-title">
              <img
                src={calendarIcon}
                alt=""
              />

              <div>
                <h2>Booking Information</h2>
                <p>
                  Reservation and travel details.
                </p>
              </div>
            </div>

            <div className="booking-view-info-list">

              <div>
                <span>Booking Date</span>
                <strong>
                  {booking.bookingDate ||
                    booking.date ||
                    "Not available"}
                </strong>
              </div>

              <div>
                <span>Travel Date</span>
                <strong>
                  {booking.travelDate ||
                    "Not available"}
                </strong>
              </div>

              <div>
                <span>Passengers</span>
                <strong>
                  {booking.passengers || 0}
                </strong>
              </div>

            </div>

          </div>

          {/* PAYMENT */}

          <div className="booking-view-section">

            <div className="booking-view-section-title">
              <img
                src={Revenue}
                alt=""
              />

              <div>
                <h2>Payment Information</h2>
                <p>
                  Payment details for this reservation.
                </p>
              </div>
            </div>

            <div className="booking-view-info-list">

              <div>
                <span>Total Amount</span>
                <strong className="booking-total-price">
                  $
                  {Number(
                    booking.totalAmount || 0
                  ).toLocaleString()}
                </strong>
              </div>

              <div>
                <span>Payment Status</span>

                <StatusBadge
                  status={
                    booking.paymentStatus ||
                    "Pending"
                  }
                />
              </div>

              <div>
                <span>Booking ID</span>
                <strong>{bookingId}</strong>
              </div>

            </div>

          </div>

          {/* NOTES */}

          {booking.notes && (
            <div className="booking-view-section">

              <div className="booking-view-section-title">
                <img
                  src={Notes}
                  alt=""
                />

                <div>
                  <h2>Additional Notes</h2>
                  <p>
                    Additional information for this booking.
                  </p>
                </div>
              </div>

              <div className="booking-view-notes">
                {booking.notes}
              </div>

            </div>
          )}

        </div>

      </div>

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Booking"
        message={`Are you sure you want to delete "${bookingId}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

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

export default BookingView;