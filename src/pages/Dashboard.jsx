import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Dashboard.css";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import Loader from "../components/Loader";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";

import dashboardIcon from "../assets/dashboard.png";
import destinationIcon from "../assets/destination.png";
import tripIcon from "../assets/trip.png";
import bookingIcon from "../assets/booking.png";
import customerIcon from "../assets/customer.png";
import paymentIcon from "../assets/payment.png";
import calendarIcon from "../assets/calendar.png";
import viewIcon from "../assets/view.png";
import plusIcon from "../assets/plus.png";
import locationIcon from "../assets/location.png";
import priceIcon from "../assets/price.png";
import price from "../assets/revenue.png";


function Dashboard() {
  const navigate = useNavigate();

  const {
    destinations,
    trips,
    customers,
    bookings,
    payments,
    statistics,
  } = useTravel();

  const [loading, setLoading] = useState(true);

  /*
    -------------------------------------------------------
    LOADING
    -------------------------------------------------------
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
    -------------------------------------------------------
    SAFETY
    -------------------------------------------------------
  */

  const destinationList = Array.isArray(destinations)
    ? destinations
    : [];

  const tripList = Array.isArray(trips)
    ? trips
    : [];

  const customerList = Array.isArray(customers)
    ? customers
    : [];

  const bookingList = Array.isArray(bookings)
    ? bookings
    : [];

  const paymentList = Array.isArray(payments)
    ? payments
    : [];

  const stats = statistics || {};

  /*
    -------------------------------------------------------
    RECENT BOOKINGS
    -------------------------------------------------------
  */

  const recentBookings = [];

  for (const booking of bookingList) {
    recentBookings.push(booking);
  }

  recentBookings.sort((first, second) => {
    const firstDate = new Date(first.bookingDate);
    const secondDate = new Date(second.bookingDate);

    return secondDate - firstDate;
  });

  const recentBookingList = recentBookings.slice(0, 5);

  /*
    -------------------------------------------------------
    UPCOMING TRIPS
    -------------------------------------------------------
  */

  const upcomingTrips = [];

  for (const trip of tripList) {
    upcomingTrips.push(trip);
  }

  upcomingTrips.sort((first, second) => {
    const firstDate = new Date(first.startDate);
    const secondDate = new Date(second.startDate);

    return firstDate - secondDate;
  });

  const upcomingTripList = upcomingTrips.slice(0, 4);

  /*
    -------------------------------------------------------
    BOOKING PERCENTAGES
    -------------------------------------------------------
  */

  const totalBookings = Number(stats.totalBookings) || 0;
  const confirmedBookings = Number(stats.confirmedBookings) || 0;
  const pendingBookings = Number(stats.pendingBookings) || 0;
  const cancelledBookings = Number(stats.cancelledBookings) || 0;

  let confirmedPercentage = 0;
  let pendingPercentage = 0;
  let cancelledPercentage = 0;

  if (totalBookings > 0) {
    confirmedPercentage =
      Math.round((confirmedBookings / totalBookings) * 100);

    pendingPercentage =
      Math.round((pendingBookings / totalBookings) * 100);

    cancelledPercentage =
      Math.round((cancelledBookings / totalBookings) * 100);
  }

  /*
    -------------------------------------------------------
    FORMATTERS
    -------------------------------------------------------
  */

  const formatCurrency = (value) => {
    const amount = Number(value) || 0;

    return `$${amount.toLocaleString("en-US")}`;
  };

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  /*
    -------------------------------------------------------
    NAVIGATION
    -------------------------------------------------------
  */

  const openDestinations = () => {
    navigate("/Destinations");
  };

  const openTrips = () => {
    navigate("/Trips");
  };

  const openBookings = () => {
    navigate("/Bookings");
  };

  const openCustomers = () => {
    navigate("/Customers");
  };

  const openPayments = () => {
    navigate("/Payments");
  };

  const openCalendar = () => {
    navigate("/Calendar");
  };

  const openDestinationAdd = () => {
    navigate("/Destinations/add");
  };

  const openTripAdd = () => {
    navigate("/Trips/add");
  };

  const openBookingAdd = () => {
    navigate("/Bookings/add");
  };

  const openBookingView = (id) => {
    navigate(`/Bookings/View/${id}`);
  };

  const openTripView = (id) => {
    navigate(`/Trips/View/${id}`);
  };

  /*
    -------------------------------------------------------
    LOADER
    -------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="travel-dashboard-page">
        <Topbar />

        <main className="travel-dashboard-main">
          <Loader
            message="Loading Dashboard..."
            description="Please wait while we prepare your travel dashboard."
          />
        </main>
      </div>
    );
  }

  /*
    -------------------------------------------------------
    DASHBOARD
    -------------------------------------------------------
  */

  return (
    <div className="travel-dashboard-page">

      <Topbar />

      <main className="travel-dashboard-main">

        {/* ================================================
            HEADER
        ================================================= */}

        <section className="travel-dashboard-header">

          <div className="travel-dashboard-heading">

            <div className="travel-dashboard-heading-icon">
              <img src={dashboardIcon} alt="Dashboard" />
            </div>

            <div>
              <p className="travel-dashboard-breadcrumb">
                TRAVEL & BOOKING
              </p>

              <h1>Dashboard</h1>

              <p>
                Welcome back! Here's what's happening with
                your travel business today.
              </p>
            </div>

          </div>

          <div className="travel-dashboard-header-actions">

            <button
              type="button"
              className="travel-dashboard-outline-button"
              onClick={openCalendar}
            >
              <img src={calendarIcon} alt="" />
              Calendar
            </button>

            <button
              type="button"
              className="travel-dashboard-primary-button"
              onClick={openBookingAdd}
            >
              <img src={plusIcon} alt="" />
              New Booking
            </button>

          </div>

        </section>


        {/* ================================================
            STAT CARDS
        ================================================= */}

        <section className="travel-dashboard-stat-grid">

          <div onClick={openDestinations}>
            <StatCard
              title="Destinations"
              value={stats.totalDestinations || 0}
              icon={destinationIcon}
              change="+12%"
              changeType="positive"
              description="Available destinations"
            />
          </div>

          <div onClick={openTrips}>
            <StatCard
              title="Total Trips"
              value={stats.totalTrips || 0}
              icon={tripIcon}
              change="+8%"
              changeType="positive"
              description="Upcoming travel packages"
            />
          </div>

          <div onClick={openCustomers}>
            <StatCard
              title="Customers"
              value={stats.totalCustomers || 0}
              icon={customerIcon}
              change="+15%"
              changeType="positive"
              description="Registered customers"
            />
          </div>

          <div onClick={openBookings}>
            <StatCard
              title="Bookings"
              value={stats.totalBookings || 0}
              icon={bookingIcon}
              change="+18%"
              changeType="positive"
              description="Total travel bookings"
            />
          </div>

          <div onClick={openPayments}>
            <StatCard
              title="Payments"
              value={stats.totalPayments || 0}
              icon={paymentIcon}
              change="+10%"
              changeType="positive"
              description="Payment transactions"
            />
          </div>

          <div>
            <StatCard
              title="Total Revenue"
              value={formatCurrency(stats.totalRevenue)}
              icon={price}
              change="+20%"
              changeType="positive"
              description="Revenue from paid bookings"
            />
          </div>

        </section>


        {/* ================================================
            MAIN DASHBOARD TWO COLUMNS
        ================================================= */}

        <section className="travel-dashboard-main-row">

          {/* ==============================================
              BOOKING OVERVIEW
          =============================================== */}

          <div className="travel-dashboard-card booking-overview-card">

            <div className="travel-dashboard-card-header">

              <div>
                <h2>Booking Overview</h2>
                <p>
                  Current booking status summary
                </p>
              </div>

              <button
                type="button"
                onClick={openBookings}
                className="travel-dashboard-view-all"
              >
                View All
                <img src={viewIcon} alt="" />
              </button>

            </div>


            <div className="travel-booking-overview">

              <div className="travel-booking-total">

                <div className="travel-booking-circle">

                  <span>
                    {totalBookings}
                  </span>

                  <small>
                    Bookings
                  </small>

                </div>

              </div>


              <div className="travel-booking-status-list">

                <div className="travel-booking-status-item">

                  <div className="travel-booking-status-left">

                    <span className="booking-status-dot confirmed"></span>

                    <div>
                      <strong>Confirmed</strong>
                      <small>
                        {confirmedBookings} bookings
                      </small>
                    </div>

                  </div>

                  <strong className="travel-booking-percentage">
                    {confirmedPercentage}%
                  </strong>

                </div>


                <div className="travel-booking-status-item">

                  <div className="travel-booking-status-left">

                    <span className="booking-status-dot pending"></span>

                    <div>
                      <strong>Pending</strong>
                      <small>
                        {pendingBookings} bookings
                      </small>
                    </div>

                  </div>

                  <strong className="travel-booking-percentage">
                    {pendingPercentage}%
                  </strong>

                </div>


                <div className="travel-booking-status-item">

                  <div className="travel-booking-status-left">

                    <span className="booking-status-dot cancelled"></span>

                    <div>
                      <strong>Cancelled</strong>
                      <small>
                        {cancelledBookings} bookings
                      </small>
                    </div>

                  </div>

                  <strong className="travel-booking-percentage">
                    {cancelledPercentage}%
                  </strong>

                </div>

              </div>

            </div>

          </div>


          {/* ==============================================
              QUICK ACTIONS
          =============================================== */}

          <div className="travel-dashboard-card quick-actions-card">

            <div className="travel-dashboard-card-header">

              <div>
                <h2>Quick Actions</h2>
                <p>
                  Manage your travel operations
                </p>
              </div>

            </div>


            <div className="travel-quick-actions">

              <button
                type="button"
                onClick={openDestinationAdd}
                className="travel-quick-action"
              >

                <span className="travel-quick-action-icon">
                  <img src={destinationIcon} alt="" />
                </span>

                <span>
                  <strong>Add Destination</strong>
                  <small>
                    Create a new destination
                  </small>
                </span>

                <span className="travel-quick-arrow">
                  →
                </span>

              </button>


              <button
                type="button"
                onClick={openTripAdd}
                className="travel-quick-action"
              >

                <span className="travel-quick-action-icon">
                  <img src={tripIcon} alt="" />
                </span>

                <span>
                  <strong>Add Trip</strong>
                  <small>
                    Create a new travel package
                  </small>
                </span>

                <span className="travel-quick-arrow">
                  →
                </span>

              </button>


              <button
                type="button"
                onClick={openBookingAdd}
                className="travel-quick-action"
              >

                <span className="travel-quick-action-icon">
                  <img src={bookingIcon} alt="" />
                </span>

                <span>
                  <strong>Create Booking</strong>
                  <small>
                    Add a new customer booking
                  </small>
                </span>

                <span className="travel-quick-arrow">
                  →
                </span>

              </button>

            </div>

          </div>

        </section>


        {/* ================================================
            RECENT BOOKINGS
        ================================================= */}

        <section className="travel-dashboard-card travel-recent-bookings-card">

          <div className="travel-dashboard-card-header">

            <div>
              <h2>Recent Bookings</h2>
              <p>
                Latest booking activity
              </p>
            </div>

            <button
              type="button"
              onClick={openBookings}
              className="travel-dashboard-view-all"
            >
              View All
              <img src={viewIcon} alt="" />
            </button>

          </div>


          {recentBookingList.length > 0 ? (

            <div className="travel-bookings-table-wrapper">

              <table className="travel-bookings-table">

                <thead>

                  <tr>
                    <th>Booking</th>
                    <th>Customer</th>
                    <th>Destination</th>
                    <th>Travel Date</th>
                    <th>Travelers</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>

                </thead>

                <tbody>

                  {recentBookingList.map((booking) => (

                    <tr key={booking.id}>

                      <td>
                        <strong className="travel-booking-id">
                          {booking.bookingId}
                        </strong>
                      </td>

                      <td>

                        <div className="travel-customer-cell">

                          <div className="travel-customer-avatar">
                            {booking.customer
                              ? booking.customer.charAt(0).toUpperCase()
                              : "C"}
                          </div>

                          <span>
                            {booking.customer || "Unknown Customer"}
                          </span>

                        </div>

                      </td>

                      <td>

                        <div className="travel-location-cell">

                          <img
                            src={locationIcon}
                            alt=""
                          />

                          <span>
                            {booking.destination || "-"}
                          </span>

                        </div>

                      </td>

                      <td>
                        {formatDate(booking.travelDate)}
                      </td>

                      <td>
                        {booking.travelers || 0}
                      </td>

                      <td>
                        <strong>
                          {formatCurrency(booking.amount)}
                        </strong>
                      </td>

                      <td>
                        <StatusBadge
                          status={booking.bookingStatus}
                        />
                      </td>

                      <td>

                        <button
                          type="button"
                          className="travel-table-view-button"
                          onClick={() =>
                            openBookingView(booking.id)
                          }
                        >
                          <img
                            src={viewIcon}
                            alt="View"
                          />
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          ) : (

            <div className="travel-dashboard-empty">

              <img
                src={bookingIcon}
                alt=""
              />

              <h3>No bookings found</h3>

              <p>
                There are no bookings available right now.
              </p>

              <button
                type="button"
                onClick={openBookingAdd}
              >
                Create Booking
              </button>

            </div>

          )}

        </section>


        {/* ================================================
            UPCOMING TRIPS
        ================================================= */}

        <section className="travel-dashboard-card travel-upcoming-trips-card">

          <div className="travel-dashboard-card-header">

            <div>
              <h2>Upcoming Trips</h2>
              <p>
                Your next scheduled travel packages
              </p>
            </div>

            <button
              type="button"
              onClick={openTrips}
              className="travel-dashboard-view-all"
            >
              View All
              <img src={viewIcon} alt="" />
            </button>

          </div>


          {upcomingTripList.length > 0 ? (

            <div className="travel-upcoming-trip-list">

              {upcomingTripList.map((trip) => {

                const remainingSeats =
                  Number(trip.seats || 0) -
                  Number(trip.bookedSeats || 0);

                return (

                  <div
                    className="travel-upcoming-trip"
                    key={trip.id}
                  >

                    <div className="travel-upcoming-trip-image">

                      {trip.image ? (
                        <img
                          src={trip.image}
                          alt={trip.destination}
                        />
                      ) : (
                        <img
                          src={tripIcon}
                          alt=""
                        />
                      )}

                    </div>


                    <div className="travel-upcoming-trip-content">

                      <div className="travel-upcoming-trip-title-row">

                        <div>

                          <h3>
                            {trip.title}
                          </h3>

                          <div className="travel-trip-location">

                            <img
                              src={locationIcon}
                              alt=""
                            />

                            <span>
                              {trip.destination || "-"}
                            </span>

                            {trip.country ? (
                              <span>
                                , {trip.country}
                              </span>
                            ) : null}

                          </div>

                        </div>

                        <StatusBadge
                          status={trip.status}
                        />

                      </div>


                      <div className="travel-trip-details">

                        <div>

                          <img
                            src={calendarIcon}
                            alt=""
                          />

                          <span>
                            {formatDate(trip.startDate)}
                          </span>

                        </div>


                        <div>

                          <img
                            src={priceIcon}
                            alt=""
                          />

                          <span>
                            {formatCurrency(trip.price)}
                          </span>

                        </div>


                        <div>

                          <img
                            src={customerIcon}
                            alt=""
                          />

                          <span>
                            {remainingSeats} seats left
                          </span>

                        </div>

                      </div>


                      <div className="travel-trip-progress">

                        <div className="travel-trip-progress-header">

                          <span>
                            Booked Seats
                          </span>

                          <strong>
                            {trip.bookedSeats || 0}/
                            {trip.seats || 0}
                          </strong>

                        </div>

                        <div className="travel-trip-progress-bar">

                          <div
                            style={{
                              width:
                                trip.seats > 0
                                  ? `${Math.min(
                                      100,
                                      (Number(trip.bookedSeats || 0) /
                                        Number(trip.seats || 1)) *
                                        100
                                    )}%`
                                  : "0%",
                            }}
                          ></div>

                        </div>

                      </div>

                    </div>


                    <button
                      type="button"
                      className="travel-upcoming-trip-view"
                      onClick={() =>
                        openTripView(trip.id)
                      }
                    >
                      <img
                        src={viewIcon}
                        alt="View"
                      />
                    </button>

                  </div>

                );
              })}

            </div>

          ) : (

            <div className="travel-dashboard-empty">

              <img
                src={tripIcon}
                alt=""
              />

              <h3>No upcoming trips</h3>

              <p>
                There are no upcoming trips available.
              </p>

              <button
                type="button"
                onClick={openTripAdd}
              >
                Add Trip
              </button>

            </div>

          )}

        </section>


        {/* ================================================
            SUMMARY
        ================================================= */}

        <section className="travel-dashboard-summary">

          <div className="travel-summary-item">

            <div className="travel-summary-icon">
              <img
                src={destinationIcon}
                alt=""
              />
            </div>

            <div>
              <span>Destinations</span>
              <strong>
                {destinationList.length}
              </strong>
            </div>

          </div>


          <div className="travel-summary-item">

            <div className="travel-summary-icon">
              <img
                src={tripIcon}
                alt=""
              />
            </div>

            <div>
              <span>Trips</span>
              <strong>
                {tripList.length}
              </strong>
            </div>

          </div>


          <div className="travel-summary-item">

            <div className="travel-summary-icon">
              <img
                src={customerIcon}
                alt=""
              />
            </div>

            <div>
              <span>Customers</span>
              <strong>
                {customerList.length}
              </strong>
            </div>

          </div>


          <div className="travel-summary-item">

            <div className="travel-summary-icon">
              <img
                src={paymentIcon}
                alt=""
              />
            </div>

            <div>
              <span>Payments</span>
              <strong>
                {paymentList.length}
              </strong>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;