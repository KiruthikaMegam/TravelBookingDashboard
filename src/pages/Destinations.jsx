import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Destinations.css";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";
import SearchFilter from "../components/SearchFilter";

import destinationIcon from "../assets/destination.png";
import searchIcon from "../assets/search.png";
import plusIcon from "../assets/plus.png";
import viewIcon from "../assets/view.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/redDelete.png";
import locationIcon from "../assets/location.png";
import Destination from "../assets/topDestination.png";
import ActiveLocation from "../assets/activeLocation.png";
import Revenue from "../assets/revenue.png";

function Destinations() {
  const navigate = useNavigate();

  const {
    destinations,
    deleteDestination,
  } = useTravel();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortBy]);

  const filteredDestinations = [];

  for (const destination of destinations) {
    const searchValue = search.toLowerCase();

    const matchesSearch =
      String(destination.name || "")
        .toLowerCase()
        .includes(searchValue) ||
      String(destination.country || "")
        .toLowerCase()
        .includes(searchValue);

    const matchesStatus =
      statusFilter === "" ||
      destination.status === statusFilter;

    if (matchesSearch && matchesStatus) {
      filteredDestinations.push(destination);
    }
  }

  if (sortBy === "name-asc") {
    filteredDestinations.sort((a, b) =>
      String(a.name).localeCompare(String(b.name))
    );
  }

  if (sortBy === "name-desc") {
    filteredDestinations.sort((a, b) =>
      String(b.name).localeCompare(String(a.name))
    );
  }

  if (sortBy === "price-low") {
    filteredDestinations.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  }

  if (sortBy === "price-high") {
    filteredDestinations.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
  }

  if (sortBy === "rating-high") {
    filteredDestinations.sort(
      (a, b) => Number(b.rating) - Number(a.rating)
    );
  }

  const totalPages = Math.ceil(
    filteredDestinations.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const currentDestinations =
    filteredDestinations.slice(
      startIndex,
      endIndex
    );

  const handleDeleteClick = (destination) => {
    setDeleteModal({
      open: true,
      id: destination.id,
      name: destination.name,
    });
  };

  const handleDeleteConfirm = () => {
    deleteDestination(deleteModal.id);

    setDeleteModal({
      open: false,
      id: null,
      name: "",
    });

    setToast({
      message: "Destination deleted successfully.",
      type: "success",
    });

    if (
      currentDestinations.length === 1 &&
      currentPage > 1
    ) {
      setCurrentPage((previous) => previous - 1);
    }
  };

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setSortBy("");
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    return `$${Number(price || 0).toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="travel-destinations-page">
        <Topbar />

        <main className="travel-destinations-main">
          <Loader
            message="Loading Destinations..."
            description="Please wait while we load destination information."
          />
        </main>
      </div>
    );
  }

  return (
    <div className="travel-destinations-page">
      <Topbar />

      <main className="travel-destinations-main">

        {/* HEADER */}
        <section className="destination-page-header">

          <div className="destination-header-left">
            <div className="destination-header-icon">
              <img
                src={destinationIcon}
                alt="Destinations"
              />
            </div>

            <div>
              <p className="destination-breadcrumb">
                Travel Management / Destinations
              </p>

              <h1>Destinations</h1>

              <p>
                Manage all your travel destinations
                from one place.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="destination-add-button"
            onClick={() => navigate("/destinations/add")}
          >
            <img src={plusIcon} alt="" />
            <span>Add Destination</span>
          </button>

        </section>

        {/* STATS */}
        <section className="destination-mini-stats">

          <div className="destination-mini-card">
            <div className="destination-mini-icon">
              <img
                src={Destination}
                alt=""
              />
            </div>

            <div>
              <span>Total Destinations</span>
              <strong>{destinations.length}</strong>
            </div>
          </div>

          <div className="destination-mini-card">
            <div className="destination-mini-icon">
              <img
                src={ActiveLocation}
                alt=""
              />
            </div>

            <div>
              <span>Active Destinations</span>
              <strong>
                {
                  destinations.filter(
                    (item) =>
                      item.status === "Active"
                  ).length
                }
              </strong>
            </div>
          </div>

          <div className="destination-mini-card">
            <div className="destination-mini-icon">
              <img
                src={Revenue}
                alt=""
              />
            </div>

            <div>
              <span>Average Price</span>
              <strong>
                {destinations.length > 0
                  ? formatPrice(
                      destinations.reduce(
                        (total, item) =>
                          total +
                          Number(item.price || 0),
                        0
                      ) /
                        destinations.length
                    )
                  : "$0"}
              </strong>
            </div>
          </div>

        </section>

        {/* SEARCH */}
        <section className="destination-filter-card">

          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Search destination or country..."
            filters={[
              {
                name: "status",
                label: "Status",
                options: [
                  {
                    value: "Active",
                    label: "Active",
                  },
                  {
                    value: "Inactive",
                    label: "Inactive",
                  },
                ],
              },
            ]}
            selectedFilters={{
              status: statusFilter,
            }}
            onFilterChange={(name, value) => {
              if (name === "status") {
                setStatusFilter(value);
              }
            }}
            sortOptions={[
              {
                value: "name-asc",
                label: "Name A-Z",
              },
              {
                value: "name-desc",
                label: "Name Z-A",
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
                value: "rating-high",
                label: "Highest Rating",
              },
            ]}
            sortValue={sortBy}
            onSortChange={setSortBy}
            onClear={handleClearFilters}
          />

        </section>

        {/* RESULT INFO */}
        <div className="destination-result-row">

          <div>
            <h2>All Destinations</h2>

            <p>
              Showing{" "}
              <strong>
                {filteredDestinations.length}
              </strong>{" "}
              destinations
            </p>
          </div>

        </div>

        {/* DESTINATION CARDS */}
        {currentDestinations.length === 0 ? (
          <EmptyState
            icon={searchIcon}
            title="No destinations found"
            message="Try changing your search or filters."
            buttonText="Clear Filters"
            onAction={handleClearFilters}
          />
        ) : (
          <section className="destination-card-list">

            {currentDestinations.map(
              (destination) => (
                <article
                  className="destination-card"
                  key={destination.id}
                >

                  {/* IMAGE */}
                  <div className="destination-image-wrapper">

                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="destination-image"
                    />

                    <div className="destination-rating">
                      ★{" "}
                      {Number(
                        destination.rating || 0
                      ).toFixed(1)}
                    </div>

                    <div className="destination-status">
                      <StatusBadge
                        status={
                          destination.status
                        }
                      />
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="destination-card-content">

                    <div className="destination-title-row">

                      <div>
                        <h3>
                          {destination.name}
                        </h3>

                        <div className="destination-country">
                          <img
                            src={locationIcon}
                            alt=""
                          />

                          <span>
                            {destination.country}
                          </span>
                        </div>
                      </div>

                    </div>

                    <p className="destination-description">
                      {destination.description ||
                        "Explore this beautiful destination with Travelia."}
                    </p>

                    <div className="destination-info-row">

                      <div>
                        <span>Trips</span>
                        <strong>
                          {destination.trips || 0}
                        </strong>
                      </div>

                      <div>
                        <span>Starting From</span>
                        <strong>
                          {formatPrice(
                            destination.price
                          )}
                        </strong>
                      </div>

                    </div>

                    {/* ACTIONS */}
                    <div className="destination-actions">

                      <button
                        type="button"
                        className="destination-view-button"
                        onClick={() =>
                          navigate(
                            `/destinations/View/${destination.id}`
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
                        className="destination-edit-button"
                        onClick={() =>
                          navigate(
                            `/destinations/Edit/${destination.id}`
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
                        className="destination-delete-button"
                        onClick={() =>
                          handleDeleteClick(
                            destination
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
              )
            )}

          </section>
        )}

        {/* PAGINATION */}
        {filteredDestinations.length >
        itemsPerPage ? (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        ) : null}

      </main>

      {/* DELETE MODAL */}
      <ConfirmModal
        open={deleteModal.open}
        title="Delete Destination"
        message={`Are you sure you want to delete "${deleteModal.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() =>
          setDeleteModal({
            open: false,
            id: null,
            name: "",
          })
        }
      />

      {/* TOAST */}
      <Toast
        message={toast.message}
        type={toast.type}
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

export default Destinations;