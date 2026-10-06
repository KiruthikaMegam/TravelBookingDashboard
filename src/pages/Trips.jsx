import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Trips.css";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import SearchFilter from "../components/SearchFilter";

import tripIcon from "../assets/trip.png";
import searchIcon from "../assets/search.png";
import plusIcon from "../assets/plus.png";
import viewIcon from "../assets/view.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/redDelete.png";
import locationIcon from "../assets/location.png";
import Seats from "../assets/seats.png";
import Upcoming from "../assets/event.png";

function Trips() {
  const navigate = useNavigate();

  const {
    trips,
    deleteTrip,
  } = useTravel();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    id: null,
    name: "",
  });

  const itemsPerPage = 8;

  /*
    PAGE LOADING
  */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  /*
    RESET PAGE WHEN FILTER CHANGES
  */
  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    statusFilter,
    categoryFilter,
    sortBy,
  ]);

  /*
    FILTER TRIPS
  */
  const filteredTrips = [];

  for (const trip of trips) {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      String(trip.title || "")
        .toLowerCase()
        .includes(searchValue) ||
      String(trip.destination || "")
        .toLowerCase()
        .includes(searchValue) ||
      String(trip.country || "")
        .toLowerCase()
        .includes(searchValue) ||
      String(trip.category || "")
        .toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      statusFilter === "" ||
      trip.status === statusFilter;

    const matchesCategory =
      categoryFilter === "" ||
      trip.category === categoryFilter;

    if (
      matchesSearch &&
      matchesStatus &&
      matchesCategory
    ) {
      filteredTrips.push(trip);
    }
  }

  /*
    SORT TRIPS
  */
  if (sortBy === "title-asc") {
    filteredTrips.sort((a, b) =>
      String(a.title).localeCompare(
        String(b.title)
      )
    );
  }

  if (sortBy === "title-desc") {
    filteredTrips.sort((a, b) =>
      String(b.title).localeCompare(
        String(a.title)
      )
    );
  }

  if (sortBy === "price-low") {
    filteredTrips.sort(
      (a, b) =>
        Number(a.price || 0) -
        Number(b.price || 0)
    );
  }

  if (sortBy === "price-high") {
    filteredTrips.sort(
      (a, b) =>
        Number(b.price || 0) -
        Number(a.price || 0)
    );
  }

  if (sortBy === "date-newest") {
    filteredTrips.sort((a, b) =>
      String(b.startDate || "").localeCompare(
        String(a.startDate || "")
      )
    );
  }

  if (sortBy === "date-oldest") {
    filteredTrips.sort((a, b) =>
      String(a.startDate || "").localeCompare(
        String(b.startDate || "")
      )
    );
  }

  if (sortBy === "seats-high") {
    filteredTrips.sort(
      (a, b) =>
        Number(b.seats || 0) -
        Number(a.seats || 0)
    );
  }

  /*
    PAGINATION
  */
  const totalPages = Math.ceil(
    filteredTrips.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const currentTrips =
    filteredTrips.slice(
      startIndex,
      endIndex
    );

  /*
    DELETE CLICK
  */
  const handleDeleteClick = (trip) => {
    setDeleteModal({
      open: true,
      id: trip.id,
      name: trip.title,
    });
  };

  /*
    DELETE CONFIRM
  */
  const handleDeleteConfirm = () => {
    deleteTrip(deleteModal.id);

    setDeleteModal({
      open: false,
      id: null,
      name: "",
    });

    setToast({
      message: "Trip deleted successfully.",
      type: "success",
    });

    if (
      currentTrips.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage(
        (previous) => previous - 1
      );
    }
  };

  /*
    CLEAR FILTERS
  */
  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setCategoryFilter("");
    setSortBy("");
    setCurrentPage(1);
  };

  /*
    PRICE FORMAT
  */
  const formatPrice = (price) => {
    return `$${Number(
      price || 0
    ).toLocaleString()}`;
  };

  /*
    AVAILABLE SEATS
  */
  let availableSeats = 0;

  for (const trip of trips) {
    const seats = Number(
      trip.seats || 0
    );

    const bookedSeats = Number(
      trip.bookedSeats || 0
    );

    availableSeats +=
      seats - bookedSeats;
  }

  /*
    UPCOMING TRIPS
  */
  let upcomingTrips = 0;

  for (const trip of trips) {
    if (trip.status === "Upcoming") {
      upcomingTrips += 1;
    }
  }

  /*
    CATEGORY OPTIONS
  */
  const categoryOptions = [
    {
      value: "Romantic",
      label: "Romantic",
    },
    {
      value: "Luxury",
      label: "Luxury",
    },
    {
      value: "Adventure",
      label: "Adventure",
    },
    {
      value: "Heritage",
      label: "Heritage",
    },
    {
      value: "City",
      label: "City",
    },
    {
      value: "Culture",
      label: "Culture",
    },
    {
      value: "Beach",
      label: "Beach",
    },
    {
      value: "Food",
      label: "Food",
    },
  ];

  /*
    LOADING
  */
  if (loading) {
    return (
      <div className="travel-trips-page">
        <Topbar />

        <main className="travel-trips-main">
          <Loader
            message="Loading Trips..."
            description="Please wait while we load trip information."
          />
        </main>
      </div>
    );
  }

  return (
    <div className="travel-trips-page">
      <Topbar />

      <main className="travel-trips-main">

        {/* ================= HEADER ================= */}

        <section className="trip-page-header">

          <div className="trip-header-left">

            <div className="trip-header-icon">
              <img
                src={tripIcon}
                alt="Trips"
              />
            </div>

            <div>
              <p className="trip-breadcrumb">
                Travel Management / Trips
              </p>

              <h1>Trips</h1>

              <p>
                Manage all your travel trips
                and tour packages from one place.
              </p>
            </div>

          </div>

          <button
            type="button"
            className="trip-add-button"
            onClick={() =>
              navigate("/Trips/add")
            }
          >
            <img
              src={plusIcon}
              alt=""
            />

            <span>
              Add Trip
            </span>
          </button>

        </section>

        {/* ================= STATS ================= */}

        <section className="trip-mini-stats">

          <div className="trip-mini-card">

            <div className="trip-mini-icon">
              <img
                src={locationIcon}
                alt=""
              />
            </div>

            <div>
              <span>
                Total Trips
              </span>

              <strong>
                {trips.length}
              </strong>
            </div>

          </div>

          <div className="trip-mini-card">

            <div className="trip-mini-icon">
              <img
                src={Upcoming}
                alt=""
              />
            </div>

            <div>
              <span>
                Upcoming Trips
              </span>

              <strong>
                {upcomingTrips}
              </strong>
            </div>

          </div>

          <div className="trip-mini-card">

            <div className="trip-mini-icon">
              <img
                src={Seats}
                alt=""
              />
            </div>

            <div>
              <span>
                Available Seats
              </span>

              <strong>
                {availableSeats}
              </strong>
            </div>

          </div>

        </section>

        {/* ================= SEARCH / FILTER ================= */}

        <section className="trip-filter-card">

          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search trip, destination or country..."
            filters={[
              {
                name: "status",
                label: "Status",
                options: [
                  {
                    value: "Upcoming",
                    label: "Upcoming",
                  },
                  {
                    value: "Ongoing",
                    label: "Ongoing",
                  },
                  {
                    value: "Completed",
                    label: "Completed",
                  },
                  {
                    value: "Cancelled",
                    label: "Cancelled",
                  },
                ],
              },
              {
                name: "category",
                label: "Category",
                options: categoryOptions,
              },
            ]}
            selectedFilters={{
              status: statusFilter,
              category: categoryFilter,
            }}
            onFilterChange={(name, value) => {

              if (name === "status") {
                setStatusFilter(value);
              }

              if (name === "category") {
                setCategoryFilter(value);
              }

            }}
            sortOptions={[
              {
                value: "title-asc",
                label: "Title A-Z",
              },
              {
                value: "title-desc",
                label: "Title Z-A",
              },
              {
                value: "price-low",
                label: "Price Low to High",
              },
              {
                value: "price-high",
                label: "Price High to Low",
              },
              {
                value: "date-newest",
                label: "Start Date Newest",
              },
              {
                value: "date-oldest",
                label: "Start Date Oldest",
              },
              {
                value: "seats-high",
                label: "Most Seats",
              },
            ]}
            sortValue={sortBy}
            onSortChange={setSortBy}
            onClear={handleClearFilters}
          />

        </section>

        {/* ================= RESULT INFO ================= */}

        <div className="trip-result-row">

          <div>
            <h2>
              All Trips
            </h2>

            <p>
              Showing{" "}
              <strong>
                {filteredTrips.length}
              </strong>{" "}
              trips
            </p>
          </div>

        </div>

        {/* ================= TRIP CARDS ================= */}

        {currentTrips.length === 0 ? (

          <EmptyState
            icon={searchIcon}
            title="No trips found"
            message="Try changing your search or filters."
            buttonText="Clear Filters"
            onAction={
              handleClearFilters
            }
          />

        ) : (

          <section className="trip-card-list">

            {currentTrips.map(
              (trip) => {

                const seats =
                  Number(
                    trip.seats || 0
                  );

                const bookedSeats =
                  Number(
                    trip.bookedSeats || 0
                  );

                const available =
                  seats -
                  bookedSeats;

                return (
                  <article
                    className="trip-card"
                    key={trip.id}
                  >

                    {/* IMAGE */}

                    <div className="trip-image-wrapper">

                      {trip.image ? (
                        <img
                          src={trip.image}
                          alt={trip.title}
                          className="trip-image"
                        />
                      ) : (
                        <div className="trip-image-placeholder">
                          <img
                            src={tripIcon}
                            alt=""
                          />
                        </div>
                      )}

                      <div className="trip-category">
                        {trip.category ||
                          "Travel"}
                      </div>

                      <div className="trip-status">
                        <StatusBadge
                          status={
                            trip.status
                          }
                        />
                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="trip-card-content">

                      <div className="trip-title-row">

                        <div>

                          <h3>
                            {trip.title}
                          </h3>

                          <div className="trip-country">

                            <img
                              src={
                                locationIcon
                              }
                              alt=""
                            />

                            <span>
                              {trip.destination}
                              {trip.country
                                ? `, ${trip.country}`
                                : ""}
                            </span>

                          </div>

                        </div>

                      </div>

                      <p className="trip-description">
                        {trip.description ||
                          "Explore this wonderful trip with Travelia."}
                      </p>

                      {/* DATE */}

                      <div className="trip-date-row">

                        <div>
                          <span>
                            Start Date
                          </span>

                          <strong>
                            {trip.startDate ||
                              "-"}
                          </strong>
                        </div>

                        <div>
                          <span>
                            End Date
                          </span>

                          <strong>
                            {trip.endDate ||
                              "-"}
                          </strong>
                        </div>

                      </div>

                      {/* INFO */}

                      <div className="trip-info-row">

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
                            Price
                          </span>

                          <strong>
                            {formatPrice(
                              trip.price
                            )}
                          </strong>
                        </div>

                      </div>

                      {/* SEATS */}

                      <div className="trip-seat-row">

                        <div>

                          <span>
                            Seats
                          </span>

                          <strong>
                            {bookedSeats}/
                            {seats}
                          </strong>

                        </div>

                        <div>

                          <span>
                            Available
                          </span>

                          <strong>
                            {available}
                          </strong>

                        </div>

                      </div>

                      {/* ACTIONS */}

                      <div className="trip-actions">

                        <button
                          type="button"
                          className="trip-view-button"
                          onClick={() =>
                            navigate(
                              `/Trips/view/${trip.id}`
                            )
                          }
                        >
                          <img
                            src={viewIcon}
                            alt=""
                          />

                          View
                        </button>

                        <button
                          type="button"
                          className="trip-edit-button"
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

                        <button
                          type="button"
                          className="trip-delete-button"
                          onClick={() =>
                            handleDeleteClick(
                              trip
                            )
                          }
                        >
                          <img
                            src={deleteIcon}
                            alt=""
                          />
                        </button>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </section>
        )}

        {/* ================= PAGINATION ================= */}

        {filteredTrips.length >
        itemsPerPage ? (
          <Pagination
            currentPage={
              currentPage
            }
            totalPages={
              totalPages
            }
            onPageChange={
              setCurrentPage
            }
          />
        ) : null}

      </main>

      {/* ================= DELETE MODAL ================= */}

      <ConfirmModal
        open={
          deleteModal.open
        }
        title="Delete Trip"
        message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={
          handleDeleteConfirm
        }
        onCancel={() =>
          setDeleteModal({
            open: false,
            id: null,
            name: "",
          })
        }
      />

      {/* ================= TOAST ================= */}

      <Toast
        message={
          toast.message
        }
        type={
          toast.type
        }
        onClose={() =>
          setToast({
            message: "",
            type: "success",
          })
        }
      />

    </div>
  );
}

export default Trips;