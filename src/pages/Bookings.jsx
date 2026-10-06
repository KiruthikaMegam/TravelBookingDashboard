import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import Loader from "../components/Loader";
import Toast from "../components/Toast";
import EmptyState from "../components/EmptyState";
import SearchFilter from "../components/SearchFilter";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import StatusBadge from "../components/StatusBadge";

import "./Bookings.css";

import bookingIcon from "../assets/booking.png";
import plusIcon from "../assets/plus.png";
import viewIcon from "../assets/view.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/redDelete.png";
import calendarIcon from "../assets/calendar.png";
import customerIcon from "../assets/customer.png";
import priceIcon from "../assets/price.png";
import All from "../assets/all.png";
import Confirmed from "../assets/confirmed.png";
import Pending from "../assets/pending.png";
import Cancelled from "../assets/cancel.png";
import Revenue from "../assets/revenue.png";
import bookingId from "../assets/id.png";
import Name from "../assets/name.png";
import Trip from "../assets/topDestination.png";
import Rupee from "../assets/rupee.png";

function Bookings() {
  const navigate = useNavigate();

  const {
    bookings,
    customers,
    trips,
    deleteBooking,
  } = useTravel();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const itemsPerPage = 8;

  /* ---------------- LOADING ---------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  /* ---------------- RESET PAGE ---------------- */

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    statusFilter,
    paymentFilter,
    sortBy,
  ]);

  /* ---------------- CUSTOMER NAME ---------------- */

  const getCustomerName = (customerId) => {
    for (const customer of customers) {
      if (
        Number(customer.id) ===
        Number(customerId)
      ) {
        return (
          customer.name ||
          customer.fullName ||
          "Unknown Customer"
        );
      }
    }

    return "Unknown Customer";
  };

  /* ---------------- TRIP NAME ---------------- */

  const getTripName = (tripId) => {
    for (const trip of trips) {
      if (
        Number(trip.id) ===
        Number(tripId)
      ) {
        return trip.title || "Unknown Trip";
      }
    }

    return "Unknown Trip";
  };

  /* ---------------- FILTER ---------------- */

  const filteredBookings = [];

  for (const booking of bookings) {
    const customerName = getCustomerName(
      booking.customerId
    );

    const tripName = getTripName(
      booking.tripId
    );

    const searchText = `
      ${booking.id}
      ${booking.bookingId || ""}
      ${customerName}
      ${tripName}
      ${booking.destination || ""}
      ${booking.bookingDate || ""}
      ${booking.travelDate || ""}
    `.toLowerCase();

    if (
      search &&
      !searchText.includes(
        search.toLowerCase()
      )
    ) {
      continue;
    }

    if (
      statusFilter !== "All" &&
      booking.status !== statusFilter
    ) {
      continue;
    }

    if (
      paymentFilter !== "All" &&
      booking.paymentStatus !== paymentFilter
    ) {
      continue;
    }

    filteredBookings.push(booking);
  }

  /* ---------------- SORT ---------------- */

  const sortedBookings = [
    ...filteredBookings,
  ];

  if (sortBy === "newest") {
    sortedBookings.sort((a, b) => {
      return (
        Number(b.id) -
        Number(a.id)
      );
    });
  }

  if (sortBy === "oldest") {
    sortedBookings.sort((a, b) => {
      return (
        Number(a.id) -
        Number(b.id)
      );
    });
  }

  if (sortBy === "price-high") {
    sortedBookings.sort((a, b) => {
      return (
        Number(b.totalAmount || 0) -
        Number(a.totalAmount || 0)
      );
    });
  }

  if (sortBy === "price-low") {
    sortedBookings.sort((a, b) => {
      return (
        Number(a.totalAmount || 0) -
        Number(b.totalAmount || 0)
      );
    });
  }

  /* ---------------- PAGINATION ---------------- */

  const totalPages = Math.ceil(
    sortedBookings.length /
      itemsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const currentBookings =
    sortedBookings.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  /* ---------------- STATISTICS ---------------- */

  let totalRevenue = 0;
  let confirmedCount = 0;
  let pendingCount = 0;
  let cancelledCount = 0;

  for (const booking of bookings) {
    totalRevenue += Number(
      booking.totalAmount || 0
    );

    if (
      booking.status ===
      "Confirmed"
    ) {
      confirmedCount += 1;
    }

    if (
      booking.status ===
      "Pending"
    ) {
      pendingCount += 1;
    }

    if (
      booking.status ===
      "Cancelled"
    ) {
      cancelledCount += 1;
    }
  }

  /* ---------------- DELETE ---------------- */

  const handleDeleteClick = (
    booking
  ) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setSelectedBooking(null);
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    if (!selectedBooking) {
      return;
    }

    const bookingId = Number(
      selectedBooking.id
    );

    deleteBooking(bookingId);

    setSelectedBooking(null);
    setShowDeleteModal(false);

    setToast({
      show: true,
      type: "success",
      message:
        "Booking deleted successfully.",
    });
  };

  /* ---------------- CLEAR ---------------- */

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPaymentFilter("All");
    setSortBy("newest");
  };

  /* ---------------- LOADER ---------------- */

  if (loading) {
    return (
      <Loader
        message="Loading bookings..."
        description="Please wait while we prepare your booking list."
      />
    );
  }

  return (
    <div className="bookings-page">

      {/* TOPBAR */}

      <Topbar />

      {/* PAGE CONTENT */}

      <div className="bookings-content">

        {/* HEADER */}

        <div className="bookings-header">

          <div className="bookings-title-section">

            <div className="bookings-title-icon">
              <img
                src={bookingIcon}
                alt="Bookings"
              />
            </div>

            <div>
              <h1>Bookings</h1>

              <p>
                Manage customer bookings and
                travel reservations.
              </p>
            </div>

          </div>

          <button
            type="button"
            className="booking-add-button"
            onClick={() =>
              navigate("/Bookings/add")
            }
          >
            <img
              src={plusIcon}
              alt=""
            />

            Add Booking
          </button>

        </div>

        {/* STATISTICS */}

        <div className="booking-stats">

          {/* TOTAL */}

          <div className="booking-stat-card">

            <div className="booking-stat-icon purple">
              <img
                src={All}
                alt=""
              />
            </div>

            <div>
              <span>
                Total Bookings
              </span>

              <strong>
                {bookings.length}
              </strong>
            </div>

          </div>

          {/* CONFIRMED */}

          <div className="booking-stat-card">

            <div className="booking-stat-icon green">
              <img
                src={Confirmed}
                alt=""
              />
            </div>

            <div>
              <span>
                Confirmed
              </span>

              <strong>
                {confirmedCount}
              </strong>
            </div>

          </div>

          {/* PENDING */}

          <div className="booking-stat-card">

            <div className="booking-stat-icon orange">
              <img
                src={Pending}
                alt=""
              />
            </div>

            <div>
              <span>
                Pending
              </span>

              <strong>
                {pendingCount}
              </strong>
            </div>

          </div>

          {/* CANCELLED */}

          <div className="booking-stat-card">

            <div className="booking-stat-icon red">
              <img
                src={Cancelled}
                alt=""
              />
            </div>

            <div>
              <span>
                Cancelled
              </span>

              <strong>
                {cancelledCount}
              </strong>
            </div>

          </div>

          {/* REVENUE */}

          <div className="booking-stat-card">

            <div className="booking-stat-icon blue">
              <img
                src={Revenue}
                alt=""
              />
            </div>

            <div>
              <span>
                Total Revenue
              </span>

              <strong>
                $
                {totalRevenue.toLocaleString()}
              </strong>
            </div>

          </div>

        </div>

        {/* SEARCH FILTER */}

        <div className="booking-filter-wrapper">

          <SearchFilter
            search={search}
            onSearchChange={setSearch}

            filters={[
              {
                key: "status",
                label: "Booking Status",
                options: [
                  "All",
                  "Confirmed",
                  "Pending",
                  "Cancelled",
                  "Completed",
                ],
              },
              {
                key: "payment",
                label: "Payment Status",
                options: [
                  "All",
                  "Paid",
                  "Pending",
                  "Partial",
                  "Failed",
                  "Refunded",
                ],
              },
            ]}

            selectedFilters={{
              status: statusFilter,
              payment: paymentFilter,
            }}

            onFilterChange={(
              key,
              value
            ) => {

              if (
                key === "status"
              ) {
                setStatusFilter(value);
              }

              if (
                key === "payment"
              ) {
                setPaymentFilter(value);
              }

            }}

            sortOptions={[
              {
                value: "newest",
                label: "Newest",
              },
              {
                value: "oldest",
                label: "Oldest",
              },
              {
                value: "price-high",
                label:
                  "Price: High to Low",
              },
              {
                value: "price-low",
                label:
                  "Price: Low to High",
              },
            ]}

            sortValue={sortBy}
            onSortChange={setSortBy}
            onClear={handleClearFilters}
          />

        </div>

        {/* RESULT COUNT */}

        <div className="booking-result-row">

          <span>
            Showing{" "}
            <strong>
              {currentBookings.length}
            </strong>{" "}
            of{" "}
            <strong>
              {sortedBookings.length}
            </strong>{" "}
            bookings
          </span>

        </div>

        {/* BOOKING LIST */}

        {currentBookings.length === 0 ? (

          <EmptyState
            icon={bookingIcon}
            title="No bookings found"
            message="Try changing your search or filter options."
            buttonText="Clear Filters"
            onAction={handleClearFilters}
          />

        ) : (

          <div className="booking-list">

            {currentBookings.map(
              (booking) => {

                const customerName =
                  getCustomerName(
                    booking.customerId
                  );

                const tripName =
                  getTripName(
                    booking.tripId
                  );

                return (
                  <div
                    className="booking-card"
                    key={booking.id}
                  >

                    {/* CARD HEADER */}

                    <div className="booking-card-top">

                      <div className="booking-number">

                        <div className="booking-card-icon">

                          <img
                            src={bookingId}
                            alt=""
                          />

                        </div>

                        <div>

                          <span>
                            Booking ID
                          </span>

                          <h3>
                            {booking.bookingId ||
                              `BK-${booking.id}`}
                          </h3>

                        </div>

                      </div>

                      <StatusBadge
                        status={
                          booking.status ||
                          "Pending"
                        }
                      />

                    </div>

                    {/* CARD BODY */}

                    <div className="booking-card-body">

                      {/* CUSTOMER */}

                      <div className="booking-info">

                        <img
                          src={Name}
                          alt=""
                        />

                        <div>

                          <span>
                            Customer
                          </span>

                          <strong>
                            {customerName}
                          </strong>

                        </div>

                      </div>

                      {/* TRIP */}

                      <div className="booking-info">

                        <img
                          src={Trip}
                          alt=""
                        />

                        <div>

                          <span>
                            Trip
                          </span>

                          <strong>
                            {tripName}
                          </strong>

                        </div>

                      </div>

                      {/* BOOKING DATE */}

                      <div className="booking-info">

                        <img
                          src={calendarIcon}
                          alt=""
                        />

                        <div>

                          <span>
                            Booking Date
                          </span>

                          <strong>
                            {booking.bookingDate ||
                              booking.date ||
                              "Not available"}
                          </strong>

                        </div>

                      </div>

                      {/* AMOUNT */}

                      <div className="booking-info">

                        <img
                          src={Rupee}
                          alt=""
                        />

                        <div>

                          <span>
                            Total Amount
                          </span>

                          <strong>
                            $
                            {Number(
                              booking.totalAmount ||
                                0
                            ).toLocaleString()}
                          </strong>

                        </div>

                      </div>

                    </div>

                    {/* CARD FOOTER */}

                    <div className="booking-card-footer">

                      <div className="booking-payment">

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

                      <div className="booking-actions">

                        {/* VIEW */}

                        <button
                          type="button"
                          title="View"
                          onClick={() =>
                            navigate(
                              `/Bookings/view/${booking.id}`
                            )
                          }
                        >
                          <img
                            src={viewIcon}
                            alt="View"
                          />
                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          title="Edit"
                          onClick={() =>
                            navigate(
                              `/Bookings/edit/${booking.id}`
                            )
                          }
                        >
                          <img
                            src={editIcon}
                            alt="Edit"
                          />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          title="Delete"
                          className="delete-action"
                          onClick={() =>
                            handleDeleteClick(
                              booking
                            )
                          }
                        >
                          <img
                            src={deleteIcon}
                            alt="Delete"
                          />
                        </button>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        )}

        {/* PAGINATION */}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={
              setCurrentPage
            }
          />
        )}

      </div>

      {/* DELETE CONFIRMATION */}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Booking"
        message={
          selectedBooking
            ? `Are you sure you want to delete booking "${
                selectedBooking.bookingId ||
                `BK-${selectedBooking.id}`
              }"? This action cannot be undone.`
            : "Are you sure you want to delete this booking?"
        }
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

export default Bookings;