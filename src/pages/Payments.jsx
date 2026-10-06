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

import "./Payments.css";

import paymentIcon from "../assets/payment.png";
import searchIcon from "../assets/search.png";
import plusIcon from "../assets/plus.png";
import viewIcon from "../assets/view.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";
import customerIcon from "../assets/customer.png";
import calendarIcon from "../assets/calendar.png";
import priceIcon from "../assets/totalAmount.png";
import Confirmed from "../assets/confirmed.png";
import Pending from "../assets/pending.png";
import Cancelled from "../assets/cancel.png";

function Payments() {
  const navigate = useNavigate();

  const {
    payments,
    bookings,
    customers,
    deletePayment,
  } = useTravel();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [methodFilter, setMethodFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [selectedPayment, setSelectedPayment] =
    useState(null);

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
  }, [
    search,
    statusFilter,
    methodFilter,
    sortBy,
  ]);

  const getCustomerName = (customerId) => {
    for (const customer of customers) {
      if (
        Number(customer.id) ===
        Number(customerId)
      ) {
        return (
          customer.name ||
          customer.fullName ||
          "Customer"
        );
      }
    }

    return "Customer";
  };

  const getBookingNumber = (bookingId) => {
    for (const booking of bookings) {
      if (
        Number(booking.id) ===
        Number(bookingId)
      ) {
        return (
          booking.bookingId ||
          `BK-${booking.id}`
        );
      }
    }

    return `BK-${bookingId}`;
  };

  const getPaymentMethod = (payment) => {
    return (
      payment.paymentMethod ||
      payment.method ||
      "Unknown"
    );
  };

  const getPaymentDate = (payment) => {
    return (
      payment.paymentDate ||
      payment.date ||
      ""
    );
  };

  const getAmount = (payment) => {
    const amount = Number(payment.amount);

    if (Number.isNaN(amount)) {
      return 0;
    }

    return amount;
  };

  const filteredPayments = [];

  for (const payment of payments) {
    const customerName = getCustomerName(
      payment.customerId
    );

    const bookingNumber =
      payment.bookingNumber ||
      getBookingNumber(payment.bookingId);

    const transactionId =
      payment.transactionId || "";

    const paymentMethod =
      getPaymentMethod(payment);

    const paymentStatus =
      payment.status || "Pending";

    const searchText =
      `${customerName} ${bookingNumber} ${transactionId} ${paymentMethod} ${paymentStatus}`.toLowerCase();

    const searchMatch =
      searchText.includes(
        search.toLowerCase()
      );

    const statusMatch =
      !statusFilter ||
      paymentStatus === statusFilter;

    const methodMatch =
      !methodFilter ||
      paymentMethod === methodFilter;

    if (
      searchMatch &&
      statusMatch &&
      methodMatch
    ) {
      filteredPayments.push(payment);
    }
  }

  const sortedPayments = [];

  for (const payment of filteredPayments) {
    sortedPayments.push(payment);
  }

  if (sortBy === "newest") {
    sortedPayments.sort((a, b) => {
      const dateA = new Date(
        getPaymentDate(a)
      ).getTime();

      const dateB = new Date(
        getPaymentDate(b)
      ).getTime();

      return dateB - dateA;
    });
  }

  if (sortBy === "oldest") {
    sortedPayments.sort((a, b) => {
      const dateA = new Date(
        getPaymentDate(a)
      ).getTime();

      const dateB = new Date(
        getPaymentDate(b)
      ).getTime();

      return dateA - dateB;
    });
  }

  if (sortBy === "amount-high") {
    sortedPayments.sort((a, b) => {
      return (
        getAmount(b) -
        getAmount(a)
      );
    });
  }

  if (sortBy === "amount-low") {
    sortedPayments.sort((a, b) => {
      return (
        getAmount(a) -
        getAmount(b)
      );
    });
  }

  const totalPages = Math.ceil(
    sortedPayments.length /
      itemsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const currentPayments =
    sortedPayments.slice(
      startIndex,
      endIndex
    );

  let totalAmount = 0;
  let paidAmount = 0;
  let pendingAmount = 0;
  let failedAmount = 0;

  for (const payment of payments) {
    const amount = getAmount(payment);

    totalAmount += amount;

    if (payment.status === "Paid") {
      paidAmount += amount;
    }

    if (payment.status === "Pending") {
      pendingAmount += amount;
    }

    if (payment.status === "Failed") {
      failedAmount += amount;
    }
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleDeleteClick = (payment) => {
    setSelectedPayment(payment);
    setShowDeleteModal(true);
  };

  const handleDeleteCancel = () => {
    setSelectedPayment(null);
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    if (!selectedPayment) {
      return;
    }

    deletePayment(
      Number(selectedPayment.id)
    );

    setSelectedPayment(null);
    setShowDeleteModal(false);

    setToast({
      show: true,
      type: "success",
      message:
        "Payment deleted successfully.",
    });
  };

  const statusOptions = [
    {
      label: "All Status",
      value: "",
    },
    {
      label: "Paid",
      value: "Paid",
    },
    {
      label: "Pending",
      value: "Pending",
    },
    {
      label: "Failed",
      value: "Failed",
    },
    {
      label: "Refunded",
      value: "Refunded",
    },
    {
      label: "Partial",
      value: "Partial",
    },
  ];

  const methodOptions = [
    {
      label: "All Methods",
      value: "",
    },
    {
      label: "Card",
      value: "Card",
    },
    {
      label: "UPI",
      value: "UPI",
    },
    {
      label: "Cash",
      value: "Cash",
    },
    {
      label: "Net Banking",
      value: "Net Banking",
    },
    {
      label: "Bank Transfer",
      value: "Bank Transfer",
    },
  ];

  const filterItems = [
    {
      label: "Status",
      name: "status",
      options: statusOptions,
    },
    {
      label: "Payment Method",
      name: "method",
      options: methodOptions,
    },
  ];

  const selectedFilters = {
    status: statusFilter,
    method: methodFilter,
  };

  const handleFilterChange = (
    name,
    value
  ) => {
    if (name === "status") {
      setStatusFilter(value);
    }

    if (name === "method") {
      setMethodFilter(value);
    }
  };

  const sortOptions = [
    {
      label: "Newest First",
      value: "newest",
    },
    {
      label: "Oldest First",
      value: "oldest",
    },
    {
      label: "Amount: High to Low",
      value: "amount-high",
    },
    {
      label: "Amount: Low to High",
      value: "amount-low",
    },
  ];

  const handleClearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setMethodFilter("");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="payments-page">
        <Topbar />

        <Loader
          message="Loading payments..."
          description="Please wait while payment records are loaded."
        />
      </div>
    );
  }

  return (
    <div className="payments-page">
      <Topbar />

      <div className="payments-content">

        {/* HEADER */}

        <div className="payments-header">

          <div className="payments-title-section">

            <div className="payments-title-icon">
              <img
                src={paymentIcon}
                alt="Payments"
              />
            </div>

            <div>
              <h1>Payments</h1>

              <p>
                Manage and track all travel
                payments
              </p>
            </div>

          </div>

          <button
            type="button"
            className="payments-add-button"
            onClick={() =>
              navigate("/Payments/add")
            }
          >
            <img
              src={plusIcon}
              alt="Add"
            />

            Add Payment
          </button>

        </div>

        {/* STATISTICS */}

        <div className="payments-stats">

          <div className="payment-stat-card">
            <div className="payment-stat-icon purple">
              <img
                src={priceIcon}
                alt="Total"
              />
            </div>

            <div>
              <span>Total Payments</span>

              <strong>
                {payments.length}
              </strong>
            </div>
          </div>

          <div className="payment-stat-card">
            <div className="payment-stat-icon green">
              <img
                src={Confirmed}
                alt="Paid"
              />
            </div>

            <div>
              <span>Paid Amount</span>

              <strong>
                ₹{formatAmount(paidAmount)}
              </strong>
            </div>
          </div>

          <div className="payment-stat-card">
            <div className="payment-stat-icon orange">
              <img
                src={Pending}
                alt="Pending"
              />
            </div>

            <div>
              <span>Pending Amount</span>

              <strong>
                ₹{formatAmount(pendingAmount)}
              </strong>
            </div>
          </div>

          <div className="payment-stat-card">
            <div className="payment-stat-icon red">
              <img
                src={Cancelled}
                alt="Failed"
              />
            </div>

            <div>
              <span>Failed Amount</span>

              <strong>
                ₹{formatAmount(failedAmount)}
              </strong>
            </div>
          </div>

        </div>

        {/* SEARCH AND FILTER */}

        <div className="payments-filter-card">

          <SearchFilter
            search={search}
            onSearchChange={setSearch}
            filters={filterItems}
            selectedFilters={selectedFilters}
            onFilterChange={
              handleFilterChange
            }
            sortOptions={sortOptions}
            sortValue={sortBy}
            onSortChange={setSortBy}
            onClear={handleClearFilters}
          />

        </div>

        {/* TOTAL RESULT */}

        <div className="payments-result-header">

          <div>
            <h2>Payment Records</h2>

            <p>
              Showing{" "}
              {currentPayments.length} of{" "}
              {sortedPayments.length} payments
            </p>
          </div>

          <div className="payments-total">
            Total: ₹
            {formatAmount(totalAmount)}
          </div>

        </div>

        {/* EMPTY STATE */}

        {currentPayments.length === 0 ? (
          <EmptyState
            icon={paymentIcon}
            title="No Payments Found"
            message="No payment records match your current search or filters."
            buttonText="Clear Filters"
            onAction={
              handleClearFilters
            }
          />
        ) : (
          <div className="payments-table-card">

            <div className="payments-table-wrapper">

              <table className="payments-table">

                <thead>
                  <tr>
                    <th>Payment</th>
                    <th>Customer</th>
                    <th>Booking</th>
                    <th>Date</th>
                    <th>Method</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {currentPayments.map(
                    (payment) => {
                      const customerName =
                        payment.customerName ||
                        getCustomerName(
                          payment.customerId
                        );

                      const bookingNumber =
                        payment.bookingNumber ||
                        getBookingNumber(
                          payment.bookingId
                        );

                      const paymentDate =
                        getPaymentDate(
                          payment
                        );

                      const paymentMethod =
                        getPaymentMethod(
                          payment
                        );

                      return (
                        <tr key={payment.id}>

                          <td>
                            <div className="payment-id-cell">

                              <div className="payment-small-icon">
                                <img
                                  src={
                                    paymentIcon
                                  }
                                  alt="Payment"
                                />
                              </div>

                              <div>
                                <strong>
                                  {payment.paymentId ||
                                    `PAY-${payment.id}`}
                                </strong>

                                <span>
                                  {payment.transactionId ||
                                    "No transaction ID"}
                                </span>
                              </div>

                            </div>
                          </td>

                          <td>
                            <div className="payment-info-cell">

                              <img
                                src={
                                  customerIcon
                                }
                                alt="Customer"
                              />

                              <span>
                                {customerName}
                              </span>

                            </div>
                          </td>

                          <td>
                            <span className="payment-booking">
                              {bookingNumber}
                            </span>
                          </td>

                          <td>
                            <div className="payment-info-cell">

                              <img
                                src={
                                  calendarIcon
                                }
                                alt="Date"
                              />

                              <span>
                                {paymentDate ||
                                  "-"}
                              </span>

                            </div>
                          </td>

                          <td>
                            <span className="payment-method">
                              {paymentMethod}
                            </span>
                          </td>

                          <td>
                            <strong className="payment-amount">
                              ₹
                              {formatAmount(
                                getAmount(
                                  payment
                                )
                              )}
                            </strong>
                          </td>

                          <td>
                            <StatusBadge
                              status={
                                payment.status ||
                                "Pending"
                              }
                            />
                          </td>

                          <td>
                            <div className="payment-actions">

                              <button
                                type="button"
                                className="payment-action view"
                                onClick={() =>
                                  navigate(
                                    `/Payments/view/${payment.id}`
                                  )
                                }
                                title="View"
                              >
                                <img
                                  src={
                                    viewIcon
                                  }
                                  alt="View"
                                />
                              </button>

                              <button
                                type="button"
                                className="payment-action edit"
                                onClick={() =>
                                  navigate(
                                    `/Payments/edit/${payment.id}`
                                  )
                                }
                                title="Edit"
                              >
                                <img
                                  src={
                                    editIcon
                                  }
                                  alt="Edit"
                                />
                              </button>

                              <button
                                type="button"
                                className="payment-action delete"
                                onClick={() =>
                                  handleDeleteClick(
                                    payment
                                  )
                                }
                                title="Delete"
                              >
                                <img
                                  src={
                                    deleteIcon
                                  }
                                  alt="Delete"
                                />
                              </button>

                            </div>
                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* PAGINATION */}

        {totalPages > 1 && (
          <div className="payments-pagination">

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={
                setCurrentPage
              }
            />

          </div>
        )}

      </div>

      {/* DELETE MODAL */}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Payment"
        message={
          selectedPayment
            ? `Are you sure you want to delete ${
                selectedPayment.paymentId ||
                `PAY-${selectedPayment.id}`
              }? This action cannot be undone.`
            : "Are you sure you want to delete this payment?"
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

export default Payments;