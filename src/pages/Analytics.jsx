import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import StatusBadge from "../components/StatusBadge";

import analyticsIcon from "../assets/analytics.png";
import bookingIcon from "../assets/booking.png";
import customerIcon from "../assets/customer.png";
import destinationIcon from "../assets/destination.png";
import paymentIcon from "../assets/payment.png";
import calendarIcon from "../assets/calendar.png";
import Revenue from "../assets/revenue.png";
import Available from "../assets/available.png";
import TopMonth from "../assets/topMonth.png";
import TopDestination from "../assets/topDestination.png";
import TopRevenue from "../assets/topRevenue.png";

import "./Analytics.css";

function Analytics() {
  const navigate = useNavigate();

  const {
    bookings,
    customers,
    destinations,
    trips,
    payments,
  } = useTravel();

  const [selectedYear, setSelectedYear] = useState(
    String(new Date().getFullYear())
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  /* =====================================================
     FORMAT FUNCTIONS
  ===================================================== */

  const formatCurrency = (value) => {
    return `$${Number(value || 0).toLocaleString()}`;
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    const parts = String(dateValue).split("-");

    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    return dateValue;
  };

  /* =====================================================
     GET YEARS
  ===================================================== */

  const availableYears = [];

  const currentYear = new Date().getFullYear();

  availableYears.push(String(currentYear));

  for (const booking of bookings) {
    const travelDate = booking.travelDate || booking.bookingDate;

    if (travelDate) {
      const year = String(travelDate).slice(0, 4);

      if (!availableYears.includes(year)) {
        availableYears.push(year);
      }
    }
  }

  for (const payment of payments) {
    if (payment.date) {
      const year = String(payment.date).slice(0, 4);

      if (!availableYears.includes(year)) {
        availableYears.push(year);
      }
    }
  }

  availableYears.sort((a, b) => Number(b) - Number(a));

  /* =====================================================
     FILTER DATA BY YEAR
  ===================================================== */

  const yearlyBookings = [];

  for (const booking of bookings) {
    const dateValue =
      booking.travelDate || booking.bookingDate;

    const year = dateValue
      ? String(dateValue).slice(0, 4)
      : "";

    if (year === selectedYear) {
      yearlyBookings.push(booking);
    }
  }

  const yearlyPayments = [];

  for (const payment of payments) {
    const year = payment.date
      ? String(payment.date).slice(0, 4)
      : "";

    if (year === selectedYear) {
      yearlyPayments.push(payment);
    }
  }

  /* =====================================================
     MONTH NAMES
  ===================================================== */

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  /* =====================================================
     MONTHLY BOOKINGS
  ===================================================== */

  const monthlyBookings = [];

  for (let index = 0; index < 12; index++) {
    monthlyBookings.push({
      month: monthNames[index],
      count: 0,
    });
  }

  for (const booking of yearlyBookings) {
    const dateValue =
      booking.travelDate || booking.bookingDate;

    if (dateValue) {
      const month = Number(String(dateValue).slice(5, 7));

      if (month >= 1 && month <= 12) {
        monthlyBookings[month - 1].count++;
      }
    }
  }

  /* =====================================================
     MONTHLY REVENUE
  ===================================================== */

  const monthlyRevenue = [];

  for (let index = 0; index < 12; index++) {
    monthlyRevenue.push({
      month: monthNames[index],
      amount: 0,
    });
  }

  for (const payment of yearlyPayments) {
    if (payment.status === "Paid") {
      const paymentDate = payment.date;

      if (paymentDate) {
        const month = Number(
          String(paymentDate).slice(5, 7)
        );

        if (month >= 1 && month <= 12) {
          monthlyRevenue[month - 1].amount += Number(
            payment.amount || 0
          );
        }
      }
    }
  }

  /* =====================================================
     BOOKING STATUS
  ===================================================== */

  const bookingStatusData = [
    {
      name: "Confirmed",
      count: 0,
      className: "confirmed",
    },
    {
      name: "Pending",
      count: 0,
      className: "pending",
    },
    {
      name: "Cancelled",
      count: 0,
      className: "cancelled",
    },
  ];

  for (const booking of yearlyBookings) {
    if (booking.bookingStatus === "Confirmed") {
      bookingStatusData[0].count++;
    }

    if (booking.bookingStatus === "Pending") {
      bookingStatusData[1].count++;
    }

    if (booking.bookingStatus === "Cancelled") {
      bookingStatusData[2].count++;
    }
  }

  /* =====================================================
     PAYMENT STATUS
  ===================================================== */

  const paymentStatusData = [
    {
      name: "Paid",
      count: 0,
      amount: 0,
      className: "paid",
    },
    {
      name: "Pending",
      count: 0,
      amount: 0,
      className: "pending",
    },
    {
      name: "Partial",
      count: 0,
      amount: 0,
      className: "partial",
    },
    {
      name: "Refunded",
      count: 0,
      amount: 0,
      className: "refunded",
    },
  ];

  for (const payment of yearlyPayments) {
    for (const item of paymentStatusData) {
      if (payment.status === item.name) {
        item.count++;
        item.amount += Number(payment.amount || 0);
      }
    }
  }

  /* =====================================================
     TOTALS
  ===================================================== */

  let totalRevenue = 0;
  let pendingRevenue = 0;
  let partialRevenue = 0;
  let refundedRevenue = 0;

  for (const payment of yearlyPayments) {
    const amount = Number(payment.amount || 0);

    if (payment.status === "Paid") {
      totalRevenue += amount;
    }

    if (payment.status === "Pending") {
      pendingRevenue += amount;
    }

    if (payment.status === "Partial") {
      partialRevenue += amount;
    }

    if (payment.status === "Refunded") {
      refundedRevenue += amount;
    }
  }

  /* =====================================================
     BEST BOOKING MONTH
  ===================================================== */

  let bestBookingMonth = "-";
  let highestBookingCount = 0;

  for (const item of monthlyBookings) {
    if (item.count > highestBookingCount) {
      highestBookingCount = item.count;
      bestBookingMonth = item.month;
    }
  }

  /* =====================================================
     BEST REVENUE MONTH
  ===================================================== */

  let bestRevenueMonth = "-";
  let highestRevenue = 0;

  for (const item of monthlyRevenue) {
    if (item.amount > highestRevenue) {
      highestRevenue = item.amount;
      bestRevenueMonth = item.month;
    }
  }

  /* =====================================================
     TOP DESTINATIONS
  ===================================================== */

  const destinationStats = [];

  for (const destination of destinations) {
    let bookingCount = 0;
    let revenue = 0;

    for (const booking of yearlyBookings) {
      let bookingDestination = booking.destination || "";

      /*
        If booking does not directly contain destination,
        find it through tripId.
      */

      if (!bookingDestination && booking.tripId) {
        for (const trip of trips) {
          if (Number(trip.id) === Number(booking.tripId)) {
            bookingDestination = trip.destination || "";
            break;
          }
        }
      }

      if (
        String(bookingDestination).toLowerCase() ===
        String(destination.name).toLowerCase()
      ) {
        bookingCount++;
        revenue += Number(booking.amount || 0);
      }
    }

    destinationStats.push({
      id: destination.id,
      name: destination.name,
      country: destination.country,
      image: destination.image,
      bookingCount,
      revenue,
    });
  }

  destinationStats.sort(
    (a, b) => b.bookingCount - a.bookingCount
  );

  const topDestinations = destinationStats.slice(0, 5);

  let highestDestinationBookings = 1;

  for (const destination of topDestinations) {
    if (
      destination.bookingCount >
      highestDestinationBookings
    ) {
      highestDestinationBookings =
        destination.bookingCount;
    }
  }

  /* =====================================================
     RECENT BOOKINGS
  ===================================================== */

  const recentBookings = [];

  for (const booking of yearlyBookings) {
    recentBookings.push(booking);
  }

  recentBookings.sort((a, b) => {
    const dateA =
      a.bookingDate || a.travelDate || "";

    const dateB =
      b.bookingDate || b.travelDate || "";

    return String(dateB).localeCompare(String(dateA));
  });

  const recentBookingList = recentBookings.slice(0, 6);

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="analytics-page">
        <Topbar />

        <div className="analytics-loading">
          <div className="analytics-spinner"></div>
          <p>Loading analytics...</p>
        </div>
      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="analytics-page">
      <Topbar />

      <main className="analytics-content">

        {/* =================================================
            HEADER
        ================================================= */}

        <section className="analytics-header">
          <div className="analytics-header-left">

            <div className="analytics-page-icon">
              <img
                src={analyticsIcon}
                alt="Analytics"
              />
            </div>

            <div>
              <h1>Analytics</h1>
              <p>
                Analyze bookings, revenue, customers and
                travel performance.
              </p>
            </div>

          </div>

          <div className="analytics-year-filter">
            <img
              src={calendarIcon}
              alt="Calendar"
            />

            <select
              value={selectedYear}
              onChange={(event) =>
                setSelectedYear(event.target.value)
              }
            >
              {availableYears.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <section className="analytics-summary">

          <div className="analytics-summary-card">
            <div className="analytics-summary-icon">
              <img
                src={bookingIcon}
                alt="Bookings"
              />
            </div>

            <div>
              <span>Total Bookings</span>
              <strong>{yearlyBookings.length}</strong>
              <small>
                {bookingStatusData[0].count} confirmed
              </small>
            </div>
          </div>

          <div className="analytics-summary-card">
            <div className="analytics-summary-icon revenue-icon">
              <img
                src={Revenue}
                alt="Revenue"
              />
            </div>

            <div>
              <span>Total Revenue</span>
              <strong>
                {formatCurrency(totalRevenue)}
              </strong>
              <small>
                {yearlyPayments.length} payments
              </small>
            </div>
          </div>

          <div className="analytics-summary-card">
            <div className="analytics-summary-icon">
              <img
                src={customerIcon}
                alt="Customers"
              />
            </div>

            <div>
              <span>Total Customers</span>
              <strong>{customers.length}</strong>
              <small>Registered customers</small>
            </div>
          </div>

          <div className="analytics-summary-card">
            <div className="analytics-summary-icon">
              <img
                src={destinationIcon}
                alt="Destinations"
              />
            </div>

            <div>
              <span>Destinations</span>
              <strong>{destinations.length}</strong>
              <small>
                {trips.length} available trips
              </small>
            </div>
          </div>

        </section>

        {/* =================================================
            PERFORMANCE CARDS
        ================================================= */}

        <section className="analytics-performance">

          <div className="analytics-performance-card">
            <div className="analytics-performance-icon">
              <img
                src={TopMonth}
                alt="Booking"
              />
            </div>

            <div>
              <span>Best Booking Month</span>
              <strong>
                {bestBookingMonth}
              </strong>
              <small>
                {highestBookingCount} bookings
              </small>
            </div>
          </div>

          <div className="analytics-performance-card">
            <div className="analytics-performance-icon">
              <img
                src={TopRevenue}
                alt="Revenue"
              />
            </div>

            <div>
              <span>Best Revenue Month</span>
              <strong>
                {bestRevenueMonth}
              </strong>
              <small>
                {formatCurrency(highestRevenue)}
              </small>
            </div>
          </div>

          <div className="analytics-performance-card">
            <div className="analytics-performance-icon">
              <img
                src={Available}
                alt="Trips"
              />
            </div>

            <div>
              <span>Available Trips</span>
              <strong>{trips.length}</strong>
              <small>Travel packages</small>
            </div>
          </div>

          <div className="analytics-performance-card">
            <div className="analytics-performance-icon">
              <img
                src={TopDestination}
                alt="Destinations"
              />
            </div>

            <div>
              <span>Top Destination</span>

              <strong>
                {topDestinations.length > 0
                  ? topDestinations[0].name
                  : "-"}
              </strong>

              <small>
                {topDestinations.length > 0
                  ? `${topDestinations[0].bookingCount} bookings`
                  : "No bookings"}
              </small>
            </div>
          </div>

        </section>

        {/* =================================================
            MONTHLY BOOKING CHART
        ================================================= */}

        <section className="analytics-card analytics-monthly-card">

          <div className="analytics-card-header">
            <div>
              <h2>Monthly Bookings</h2>
              <p>
                Booking activity during {selectedYear}
              </p>
            </div>
{/* 
            <img
              src={bookingIcon}
              alt="Bookings"
            /> */}
          </div>

          <div className="analytics-booking-chart">

            {monthlyBookings.map((item) => {

              let maxValue = 1;

              for (const month of monthlyBookings) {
                if (month.count > maxValue) {
                  maxValue = month.count;
                }
              }

              let height = 0;

              if (item.count > 0) {
                height =
                  (item.count / maxValue) * 100;
              }

              return (
                <div
                  className="analytics-bar-column"
                  key={item.month}
                >
                  <div className="analytics-bar-value">
                    {item.count}
                  </div>

                  <div className="analytics-bar-wrapper">
                    <div
                      className="analytics-bar"
                      style={{
                        height: `${height}%`,
                      }}
                    ></div>
                  </div>

                  <span>{item.month}</span>
                </div>
              );
            })}

          </div>
        </section>

        {/* =================================================
            TWO COLUMN SECTION
        ================================================= */}

        <section className="analytics-two-column">

          {/* MONTHLY REVENUE */}

          <div className="analytics-card">

            <div className="analytics-card-header">
              <div>
                <h2>Monthly Revenue</h2>
                <p>
                  Paid revenue in {selectedYear}
                </p>
              </div>

              <img
                src={paymentIcon}
                alt="Payment"
              />
            </div>

            <div className="analytics-revenue-list">

              {monthlyRevenue.map((item) => {

                let maxAmount = 1;

                for (const month of monthlyRevenue) {
                  if (month.amount > maxAmount) {
                    maxAmount = month.amount;
                  }
                }

                let width = 0;

                if (item.amount > 0) {
                  width =
                    (item.amount / maxAmount) * 100;
                }

                return (
                  <div
                    className="analytics-revenue-row"
                    key={item.month}
                  >
                    <div className="analytics-revenue-top">
                      <span>{item.month}</span>

                      <strong>
                        {formatCurrency(item.amount)}
                      </strong>
                    </div>

                    <div className="analytics-revenue-track">
                      <div
                        className="analytics-revenue-fill"
                        style={{
                          width: `${width}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* BOOKING STATUS */}

          <div className="analytics-card">

            <div className="analytics-card-header">
              <div>
                <h2>Booking Status</h2>
                <p>
                  Booking status distribution
                </p>
              </div>

              {/* <img
                src={bookingIcon}
                alt="Booking"
              /> */}
            </div>

            <div className="analytics-status-list">

              {bookingStatusData.map((item) => {

                let percentage = 0;

                if (yearlyBookings.length > 0) {
                  percentage =
                    (item.count /
                      yearlyBookings.length) *
                    100;
                }

                return (
                  <div
                    className="analytics-status-row"
                    key={item.name}
                  >
                    <div className="analytics-status-info">
                      <div className="analytics-status-name">
                        <span
                          className={`analytics-status-dot ${item.className}`}
                        ></span>

                        <span>{item.name}</span>
                      </div>

                      <strong>
                        {item.count}
                      </strong>
                    </div>

                    <div className="analytics-status-track">
                      <div
                        className={`analytics-status-fill ${item.className}`}
                        style={{
                          width: `${percentage}%`,
                        }}
                      ></div>
                    </div>

                    <small>
                      {percentage.toFixed(0)}%
                    </small>
                  </div>
                );
              })}

            </div>
          </div>

        </section>

        {/* =================================================
            PAYMENT STATUS
        ================================================= */}

        <section className="analytics-card">

          <div className="analytics-card-header">
            <div>
              <h2>Payment Status</h2>
              <p>
                Payment collection overview for{" "}
                {selectedYear}
              </p>
            </div>

            <img
              src={paymentIcon}
              alt="Payment"
            />
          </div>

          <div className="analytics-payment-status">

            {paymentStatusData.map((item) => (
              <div
                className="analytics-payment-box"
                key={item.name}
              >
                <div className="analytics-payment-box-top">
                  <span
                    className={`analytics-payment-dot ${item.className}`}
                  ></span>

                  <span>{item.name}</span>
                </div>

                <strong>{item.count}</strong>

                <p>
                  {formatCurrency(item.amount)}
                </p>
              </div>
            ))}

          </div>

          <div className="analytics-payment-summary">

            <div>
              <span>Paid Revenue</span>
              <strong>
                {formatCurrency(totalRevenue)}
              </strong>
            </div>

            <div>
              <span>Pending Revenue</span>
              <strong>
                {formatCurrency(pendingRevenue)}
              </strong>
            </div>

            <div>
              <span>Partial Payments</span>
              <strong>
                {formatCurrency(partialRevenue)}
              </strong>
            </div>

            <div>
              <span>Refunded</span>
              <strong>
                {formatCurrency(refundedRevenue)}
              </strong>
            </div>

          </div>

        </section>

        {/* =================================================
            TOP DESTINATIONS
        ================================================= */}

        <section className="analytics-card">

          <div className="analytics-card-header">
            <div>
              <h2>Top Destinations</h2>
              <p>
                Most booked destinations in{" "}
                {selectedYear}
              </p>
            </div>

            {/* <img
              src={TopDestination}
              alt="Destination"
            /> */}
          </div>

          <div className="analytics-destination-list">

            {topDestinations.map(
              (destination, index) => {

                let width =
                  (destination.bookingCount /
                    highestDestinationBookings) *
                  100;

                return (
                  <div
                    className="analytics-destination-row"
                    key={destination.id}
                  >

                    <div className="analytics-destination-rank">
                      {index + 1}
                    </div>

                    <img
                      className="analytics-destination-image"
                      src={destination.image}
                      alt={destination.name}
                    />

                    <div className="analytics-destination-info">

                      <div className="analytics-destination-title">
                        <div>
                          <strong>
                            {destination.name}
                          </strong>

                          <span>
                            {destination.country}
                          </span>
                        </div>

                        <div className="analytics-destination-values">
                          <strong>
                            {destination.bookingCount}
                          </strong>

                          <span>
                            {formatCurrency(
                              destination.revenue
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="analytics-destination-track">
                        <div
                          className="analytics-destination-fill"
                          style={{
                            width: `${width}%`,
                          }}
                        ></div>
                      </div>

                    </div>

                  </div>
                );
              }
            )}

            {topDestinations.length === 0 && (
              <div className="analytics-no-data">
                No destination booking data available
                for {selectedYear}.
              </div>
            )}

          </div>
        </section>

        {/* =================================================
            RECENT BOOKINGS
        ================================================= */}

        <section className="analytics-card">

          <div className="analytics-card-header">
            <div>
              <h2>Recent Bookings</h2>
              <p>
                Latest bookings for {selectedYear}
              </p>
            </div>

            <button
              type="button"
              className="analytics-view-all"
              onClick={() => navigate("/Bookings")}
            >
              View All
            </button>
          </div>

          <div className="analytics-booking-table">

            <div className="analytics-table-head">
              <span>Booking</span>
              <span>Customer</span>
              <span>Destination</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>
            </div>

            {recentBookingList.map((booking) => (
              <div
                className="analytics-table-row"
                key={booking.id}
              >

                <div className="analytics-booking-id">
                  <img
                    src={bookingIcon}
                    alt="Booking"
                  />

                  <div>
                    <strong>
                      {booking.bookingId}
                    </strong>

                    <span>
                      {booking.trip}
                    </span>
                  </div>
                </div>

                <span>
                  {booking.customer || "-"}
                </span>

                <span>
                  {booking.destination || "-"}
                </span>

                <span>
                  {formatDate(
                    booking.bookingDate
                  )}
                </span>

                <strong>
                  {formatCurrency(booking.amount)}
                </strong>

                <StatusBadge
                  status={booking.bookingStatus}
                />

              </div>
            ))}

            {recentBookingList.length === 0 && (
              <div className="analytics-no-data">
                No bookings available for{" "}
                {selectedYear}.
              </div>
            )}

          </div>
        </section>

      </main>
    </div>
  );
}

export default Analytics;