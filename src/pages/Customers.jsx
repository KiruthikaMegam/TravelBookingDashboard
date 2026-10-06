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

import "./Customers.css";

import customerIcon from "../assets/customer.png";
import Active from "../assets/active.png";
import Inactive from "../assets/inactive.png";
import Notes from "../assets/notes.png";
import plusIcon from "../assets/plus.png";
import viewIcon from "../assets/view.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/redDelete.png";
import bookingIcon from "../assets/booking.png";
import Mail from "../assets/mail.png";
import priceIcon from "../assets/price.png";
import Name from "../assets/name.png";

function Customers() {
  const navigate = useNavigate();

  const {
    customers,
    bookings,
    deleteCustomer,
  } = useTravel();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [sortBy, setSortBy] =
    useState("newest");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const itemsPerPage = 8;

  /* =========================
     LOADING
  ========================= */

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  /* =========================
     RESET PAGE
  ========================= */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortBy]);

  /* =========================
     CUSTOMER BOOKINGS
  ========================= */

  const getCustomerBookings = (
    customerId
  ) => {
    let count = 0;

    for (const booking of bookings) {
      if (
        Number(booking.customerId) ===
        Number(customerId)
      ) {
        count += 1;
      }
    }

    return count;
  };

  /* =========================
     FILTER
  ========================= */

  const filteredCustomers = [];

  for (const customer of customers) {
    const name =
      customer.name ||
      customer.fullName ||
      "";

    const email =
      customer.email || "";

    const phone =
      customer.phone ||
      customer.mobile ||
      customer.mobileNumber ||
      "";

    const city =
      customer.city || "";

    const searchText = `
      ${customer.id}
      ${name}
      ${email}
      ${phone}
      ${city}
    `.toLowerCase();

    if (
      search &&
      !searchText.includes(
        search.toLowerCase()
      )
    ) {
      continue;
    }

    const customerStatus =
      customer.status || "Active";

    if (
      statusFilter !== "All" &&
      customerStatus !== statusFilter
    ) {
      continue;
    }

    filteredCustomers.push(customer);
  }

  /* =========================
     SORT
  ========================= */

  const sortedCustomers = [
    ...filteredCustomers,
  ];

  if (sortBy === "newest") {
    sortedCustomers.sort((a, b) => {
      return (
        Number(b.id) -
        Number(a.id)
      );
    });
  }

  if (sortBy === "oldest") {
    sortedCustomers.sort((a, b) => {
      return (
        Number(a.id) -
        Number(b.id)
      );
    });
  }

  if (sortBy === "name-asc") {
    sortedCustomers.sort((a, b) => {
      const nameA =
        a.name ||
        a.fullName ||
        "";

      const nameB =
        b.name ||
        b.fullName ||
        "";

      return nameA.localeCompare(nameB);
    });
  }

  if (sortBy === "name-desc") {
    sortedCustomers.sort((a, b) => {
      const nameA =
        a.name ||
        a.fullName ||
        "";

      const nameB =
        b.name ||
        b.fullName ||
        "";

      return nameB.localeCompare(nameA);
    });
  }

  /* =========================
     PAGINATION
  ========================= */

  const totalPages = Math.ceil(
    sortedCustomers.length /
      itemsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const currentCustomers =
    sortedCustomers.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  /* =========================
     STATISTICS
  ========================= */

  let activeCustomers = 0;
  let inactiveCustomers = 0;
  let totalCustomerBookings = 0;

  for (const customer of customers) {
    const status =
      customer.status || "Active";

    if (status === "Active") {
      activeCustomers += 1;
    }

    if (status === "Inactive") {
      inactiveCustomers += 1;
    }

    totalCustomerBookings +=
      getCustomerBookings(customer.id);
  }

  /* =========================
     DELETE
  ========================= */

  const handleDeleteClick = (
    customer
  ) => {
    setSelectedCustomer(customer);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setSelectedCustomer(null);
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    if (!selectedCustomer) {
      return;
    }

    deleteCustomer(
      Number(selectedCustomer.id)
    );

    setSelectedCustomer(null);
    setShowDeleteModal(false);

    setToast({
      show: true,
      type: "success",
      message:
        "Customer deleted successfully.",
    });
  };

  /* =========================
     CLEAR
  ========================= */

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setSortBy("newest");
  };

  /* =========================
     LOADER
  ========================= */

  if (loading) {
    return (
      <Loader
        message="Loading customers..."
        description="Please wait while we prepare your customer list."
      />
    );
  }

  return (
    <div className="customers-page">

      {/* TOPBAR */}

      <Topbar />

      <div className="customers-content">

        {/* HEADER */}

        <div className="customers-header">

          <div className="customers-title-section">

            <div className="customers-title-icon">
              <img
                src={customerIcon}
                alt="Customers"
              />
            </div>

            <div>
              <h1>Customers</h1>

              <p>
                Manage your travel customers
                and their booking information.
              </p>
            </div>

          </div>

          <button
            type="button"
            className="customer-add-button"
            onClick={() =>
              navigate("/Customers/add")
            }
          >
            <img
              src={plusIcon}
              alt=""
            />

            Add Customer
          </button>

        </div>

        {/* STATISTICS */}

        <div className="customer-stats">

          <div className="customer-stat-card">

            <div className="customer-stat-icon purple">
              <img
                src={customerIcon}
                alt=""
              />
            </div>

            <div>
              <span>Total Customers</span>

              <strong>
                {customers.length}
              </strong>
            </div>

          </div>

          <div className="customer-stat-card">

            <div className="customer-stat-icon green">
              <img
                src={Active}
                alt=""
              />
            </div>

            <div>
              <span>Active Customers</span>

              <strong>
                {activeCustomers}
              </strong>
            </div>

          </div>

          <div className="customer-stat-card">

            <div className="customer-stat-icon red">
              <img
                src={Inactive}
                alt=""
              />
            </div>

            <div>
              <span>Inactive Customers</span>

              <strong>
                {inactiveCustomers}
              </strong>
            </div>

          </div>

          <div className="customer-stat-card">

            <div className="customer-stat-icon blue">
              <img
                src={Notes}
                alt=""
              />
            </div>

            <div>
              <span>Total Bookings</span>

              <strong>
                {totalCustomerBookings}
              </strong>
            </div>

          </div>

        </div>

        {/* FILTER */}

        <div className="customer-filter-wrapper">

          <SearchFilter
            search={search}
            onSearchChange={setSearch}

            filters={[
              {
                key: "status",
                label: "Customer Status",
                options: [
                  "All",
                  "Active",
                  "Inactive",
                ],
              },
            ]}

            selectedFilters={{
              status: statusFilter,
            }}

            onFilterChange={(
              key,
              value
            ) => {
              if (key === "status") {
                setStatusFilter(value);
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
                value: "name-asc",
                label: "Name: A to Z",
              },
              {
                value: "name-desc",
                label: "Name: Z to A",
              },
            ]}

            sortValue={sortBy}
            onSortChange={setSortBy}
            onClear={handleClearFilters}
          />

        </div>

        {/* RESULT */}

        <div className="customer-result-row">

          <span>
            Showing{" "}
            <strong>
              {currentCustomers.length}
            </strong>{" "}
            of{" "}
            <strong>
              {sortedCustomers.length}
            </strong>{" "}
            customers
          </span>

        </div>

        {/* CUSTOMER LIST */}

        {currentCustomers.length === 0 ? (

          <EmptyState
            icon={customerIcon}
            title="No customers found"
            message="Try changing your search or filter options."
            buttonText="Clear Filters"
            onAction={
              handleClearFilters
            }
          />

        ) : (

          <div className="customer-list">

            {currentCustomers.map(
              (customer) => {

                const customerName =
                  customer.name ||
                  customer.fullName ||
                  "Unknown Customer";

                const customerPhone =
                  customer.phone ||
                  customer.mobile ||
                  customer.mobileNumber ||
                  "No phone number";

                const customerCity =
                  customer.city ||
                  customer.location ||
                  "Location not available";

                const customerEmail =
                  customer.email ||
                  "No email";

                const bookingCount =
                  getCustomerBookings(
                    customer.id
                  );

                return (
                  <div
                    className="customer-card"
                    key={customer.id}
                  >

                    {/* CARD HEADER */}

                    <div className="customer-card-top">

                      <div className="customer-profile">

                        <div className="customer-avatar">
                          {customerName
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="customer-name-block">

                          <span>
                            Customer ID
                          </span>

                          <h3>
                            {customer.customerId ||
                              `CU-${customer.id}`}
                          </h3>

                        </div>

                      </div>

                      <StatusBadge
                        status={
                          customer.status ||
                          "Active"
                        }
                      />

                    </div>

                    {/* BODY */}

                    <div className="customer-card-body">

                      <div className="customer-info">

                        <img
                          src={Name}
                          alt=""
                        />

                        <div>
                          <span>Name</span>

                          <strong>
                            {customerName}
                          </strong>
                        </div>

                      </div>

                      <div className="customer-info">

                        <img
                          src={Mail}
                          alt=""
                        />

                        <div>
                          <span>Email</span>

                          <strong>
                            {customerEmail}
                          </strong>
                        </div>

                      </div>

                      <div className="customer-info">

                        <img
                          src={priceIcon}
                          alt=""
                        />

                        <div>
                          <span>Phone</span>

                          <strong>
                            {customerPhone}
                          </strong>
                        </div>

                      </div>

                      <div className="customer-info">

                        <img
                          src={bookingIcon}
                          alt=""
                        />

                        <div>
                          <span>Bookings</span>

                          <strong>
                            {bookingCount}
                          </strong>
                        </div>

                      </div>

                      <div className="customer-location">
                        <span>
                          Location
                        </span>

                        <strong>
                          {customerCity}
                        </strong>
                      </div>

                    </div>

                    {/* FOOTER */}

                    <div className="customer-card-footer">

                      <span>
                        Customer since{" "}
                        {customer.createdAt ||
                          customer.joinDate ||
                          "2026"}
                      </span>

                      <div className="customer-actions">

                        <button
                          type="button"
                          title="View"
                          onClick={() =>
                            navigate(
                              `/Customers/view/${customer.id}`
                            )
                          }
                        >
                          <img
                            src={viewIcon}
                            alt="View"
                          />
                        </button>

                        <button
                          type="button"
                          title="Edit"
                          onClick={() =>
                            navigate(
                              `/Customers/edit/${customer.id}`
                            )
                          }
                        >
                          <img
                            src={editIcon}
                            alt="Edit"
                          />
                        </button>

                        <button
                          type="button"
                          title="Delete"
                          className="delete-action"
                          onClick={() =>
                            handleDeleteClick(
                              customer
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

      {/* DELETE MODAL */}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Customer"
        message={
          selectedCustomer
            ? `Are you sure you want to delete "${
                selectedCustomer.name ||
                selectedCustomer.fullName ||
                "this customer"
              }"? This action cannot be undone.`
            : "Are you sure you want to delete this customer?"
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

export default Customers;