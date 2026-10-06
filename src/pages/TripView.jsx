import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import StatusBadge from "../components/StatusBadge";
import Loader from "../components/Loader";
import ErrorState from "../components/ErrorState";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";

import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/redDelete.png";
import locationIcon from "../assets/location.png";
import calendarIcon from "../assets/calendar.png";
import priceIcon from "../assets/totalAmount.png";

import "./TripView.css";

function TripView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    trips,
    deleteTrip,
  } = useTravel();

  const [trip, setTrip] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  /*
    FIND TRIP
  */
  useEffect(() => {
    let selectedTrip = null;

    for (const item of trips) {
      if (Number(item.id) === Number(id)) {
        selectedTrip = item;
        break;
      }
    }

    setTrip(selectedTrip);
    setLoading(false);
  }, [id, trips]);

  /*
    FORMAT DATE
  */
  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    const dateObject = new Date(
      `${date}T00:00:00`
    );

    return dateObject.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  /*
    FORMAT PRICE
  */
  const formatPrice = (price) => {
    return `₹${Number(
      price || 0
    ).toLocaleString("en-IN")}`;
  };

  /*
    OPEN DELETE MODAL
  */
  const handleDeleteClick = () => {
    if (!trip) {
      return;
    }

    setShowDeleteModal(true);
  };

  /*
    CANCEL DELETE
  */
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  /*
    CONFIRM DELETE
  */
  const handleDeleteConfirm = () => {
    if (!trip) {
      return;
    }

    const tripId = Number(trip.id);

    /*
      Delete from TravelContext
    */
    deleteTrip(tripId);

    /*
      Close modal
    */
    setShowDeleteModal(false);

    /*
      Show success message
    */
    setToast({
      show: true,
      type: "success",
      message: "Trip deleted successfully.",
    });

    /*
      Go back to Trips page
    */
    setTimeout(() => {
      navigate("/Trips");
    }, 800);
  };

  /*
    LOADING
  */
  if (loading) {
    return (
      <div className="trip-view-page">
        <Loader
          message="Loading Trip..."
          description="Please wait while we load the trip details."
        />
      </div>
    );
  }

  /*
    TRIP NOT FOUND
  */
  if (!trip) {
    return (
      <div className="trip-view-page">
        <ErrorState
          title="Trip Not Found"
          message="The trip you are looking for does not exist."
          buttonText="Back to Trips"
          onRetry={() => navigate("/Trips")}
        />
      </div>
    );
  }

  const totalSeats = Number(
    trip.seats || 0
  );

  const bookedSeats = Number(
    trip.bookedSeats || 0
  );

  const availableSeats =
    totalSeats - bookedSeats;

  return (
    <div className="trip-view-page">

      <div className="trip-view-content">

        {/* ================= HEADER ================= */}

        <div className="trip-view-header">

          <div>

            <button
              type="button"
              className="trip-view-back"
              onClick={() =>
                navigate("/Trips")
              }
            >
              ← Back to Trips
            </button>

            <h1>
              {trip.title}
            </h1>

            <p>
              View complete information about
              this travel package.
            </p>

          </div>

          <div className="trip-view-header-actions">

            {/* EDIT */}

            <button
              type="button"
              className="trip-view-edit"
              onClick={() =>
                navigate(
                  `/Trips/edit/${trip.id}`
                )
              }
            >
              <img
                src={editIcon}
                alt=""
              />

              Edit
            </button>

            {/* DELETE */}

            <button
              type="button"
              className="trip-view-delete"
              onClick={
                handleDeleteClick
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

        {/* ================= MAIN CARD ================= */}

        <div className="trip-view-card">

          {/* IMAGE */}

          <div className="trip-view-image">

            {trip.image ? (
              <img
                src={trip.image}
                alt={trip.title}
              />
            ) : (
              <div className="trip-view-image-placeholder">
                <span>No Image</span>
              </div>
            )}

            <div className="trip-view-status">
              <StatusBadge
                status={trip.status}
              />
            </div>

          </div>

          {/* DETAILS */}

          <div className="trip-view-details">

            {/* TITLE */}

            <div className="trip-view-title-row">

              <div>

                <span className="trip-view-category">
                  {trip.category ||
                    "Travel"}
                </span>

                <h2>
                  {trip.title}
                </h2>

              </div>

            </div>

            {/* QUICK INFO */}

            <div className="trip-view-quick-info">

              {/* DESTINATION */}

              <div className="trip-view-info-item">

                <div className="trip-view-info-icon">

                  <img
                    src={locationIcon}
                    alt=""
                  />

                </div>

                <div>

                  <span>
                    Destination
                  </span>

                  <strong>
                    {trip.destination}

                    {trip.country
                      ? `, ${trip.country}`
                      : ""}
                  </strong>

                </div>

              </div>

              {/* DATES */}

              <div className="trip-view-info-item">

                <div className="trip-view-info-icon">

                  <img
                    src={calendarIcon}
                    alt=""
                  />

                </div>

                <div>

                  <span>
                    Travel Dates
                  </span>

                  <strong>
                    {formatDate(
                      trip.startDate
                    )}

                    {" - "}

                    {formatDate(
                      trip.endDate
                    )}
                  </strong>

                </div>

              </div>

              {/* PRICE */}

              <div className="trip-view-info-item">

                <div className="trip-view-info-icon">

                  <img
                    src={priceIcon}
                    alt=""
                  />

                </div>

                <div>

                  <span>
                    Price
                  </span>

                  <strong>
                    {formatPrice(
                      trip.price
                    )}
                  </strong>

                </div>

              </div>

            </div>

            {/* TRIP DETAILS */}

            <div className="trip-view-section">

              <h3>
                Trip Details
              </h3>

              <div className="trip-view-detail-list">

                <div>
                  <span>
                    Duration
                  </span>

                  <strong>
                    {trip.duration ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <span>
                    Total Seats
                  </span>

                  <strong>
                    {totalSeats}
                  </strong>
                </div>

                <div>
                  <span>
                    Booked Seats
                  </span>

                  <strong>
                    {bookedSeats}
                  </strong>
                </div>

                <div>
                  <span>
                    Available Seats
                  </span>

                  <strong>
                    {availableSeats}
                  </strong>
                </div>

                <div>
                  <span>
                    Category
                  </span>

                  <strong>
                    {trip.category ||
                      "-"}
                  </strong>
                </div>

                <div>
                  <span>
                    Status
                  </span>

                  <StatusBadge
                    status={
                      trip.status
                    }
                  />
                </div>

              </div>

            </div>

            {/* DESCRIPTION */}

            <div className="trip-view-section">

              <h3>
                Description
              </h3>

              <p className="trip-view-description">
                {trip.description ||
                  "No description available for this trip."}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= DELETE MODAL ================= */}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Trip"
        message={`Are you sure you want to delete "${trip.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={
          handleDeleteConfirm
        }
        onCancel={
          handleDeleteCancel
        }
      />

      {/* ================= TOAST ================= */}

      {toast.show ? (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() =>
            setToast({
              show: false,
              type: "success",
              message: "",
            })
          }
        />
      ) : null}

    </div>
  );
}

export default TripView;