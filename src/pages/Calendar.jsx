import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";

import "./Calendar.css";

import calendarIcon from "../assets/calendar.png";
import bookingIcon from "../assets/booking.png";
import arrowLeft from "../assets/arrow-left.png";
import arrowRight from "../assets/arrow-right.png";
import viewIcon from "../assets/view.png";
import filterIcon from "../assets/filter.png";
import Add from "../assets/plus.png";
import Confirmed from "../assets/confirmed.png";
import Pending from "../assets/pending.png";
import Cancelled from "../assets/cancel.png";

function Calendar() {
  const navigate = useNavigate();

  const { bookings, trips, customers } = useTravel();

  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  /*
    Create a list of years from booking data.
    Current year is always included.
  */
  const availableYears = [];

  availableYears.push(today.getFullYear());

  for (const booking of bookings) {
    const bookingDate = booking.travelDate || booking.bookingDate;

    if (bookingDate) {
      const date = new Date(bookingDate);

      if (!Number.isNaN(date.getTime())) {
        const bookingYear = date.getFullYear();

        let alreadyExists = false;

        for (const availableYear of availableYears) {
          if (availableYear === bookingYear) {
            alreadyExists = true;
            break;
          }
        }

        if (!alreadyExists) {
          availableYears.push(bookingYear);
        }
      }
    }
  }

  availableYears.sort((a, b) => a - b);

  /*
    Month dropdown
  */
  const handleMonthChange = (event) => {
    const selectedMonth = Number(event.target.value);

    setCurrentDate(
      new Date(year, selectedMonth, 1)
    );
  };

  /*
    Year dropdown
  */
  const handleYearChange = (event) => {
    const selectedYear = Number(event.target.value);

    setCurrentDate(
      new Date(selectedYear, month, 1)
    );
  };

  /*
    Previous month
  */
  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  /*
    Next month
  */
  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  /*
    Today
  */
  const goToToday = () => {
    setCurrentDate(
      new Date(today.getFullYear(), today.getMonth(), 1)
    );
  };

  /*
    Get booking date
  */
  const getBookingDate = (booking) => {
    return booking.travelDate || booking.bookingDate || "";
  };

  /*
    Get bookings for selected day
  */
  const getBookingsForDay = (day) => {
    const selectedDate =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

    const dayBookings = [];

    for (const booking of bookings) {
      const bookingDate = getBookingDate(booking);

      if (bookingDate) {
        const formattedDate = String(bookingDate).slice(0, 10);

        if (formattedDate === selectedDate) {
          dayBookings.push(booking);
        }
      }
    }

    return dayBookings;
  };

  /*
    Customer name
  */
  const getCustomerName = (booking) => {
    if (booking.customerName) {
      return booking.customerName;
    }

    for (const customer of customers) {
      if (
        Number(customer.id) ===
        Number(booking.customerId)
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

  /*
    Trip name
  */
  const getTripName = (booking) => {
    if (booking.tripName) {
      return booking.tripName;
    }

    if (booking.tripTitle) {
      return booking.tripTitle;
    }

    for (const trip of trips) {
      if (
        Number(trip.id) ===
        Number(booking.tripId)
      ) {
        return (
          trip.name ||
          trip.title ||
          "Trip"
        );
      }
    }

    return "Trip";
  };

  /*
    Check today's date
  */
  const isToday = (day) => {
    return (
      today.getDate() === day &&
      today.getMonth() === month &&
      today.getFullYear() === year
    );
  };

  /*
    Calendar days
  */
  const renderCalendarDays = () => {
    const calendarDays = [];

    for (let i = 0; i < firstDay; i += 1) {
      calendarDays.push(
        <div
          className="calendar-day calendar-empty"
          key={`empty-${i}`}
        >
          <span></span>
        </div>
      );
    }

    for (let day = 1; day <= totalDays; day += 1) {
      const dayBookings = getBookingsForDay(day);

      calendarDays.push(
        <div
          className={`calendar-day ${
            isToday(day)
              ? "calendar-today"
              : ""
          }`}
          key={day}
        >
          <div className="calendar-day-header">
            <span className="calendar-day-number">
              {day}
            </span>

            {dayBookings.length > 0 && (
              <span className="calendar-booking-count">
                {dayBookings.length}
              </span>
            )}
          </div>

          <div className="calendar-events">
            {dayBookings
              .slice(0, 3)
              .map((booking) => (
                <button
                  type="button"
                  className="calendar-event"
                  key={booking.id}
                  onClick={() =>
                    navigate(
                      `/Bookings/view/${booking.id}`
                    )
                  }
                >
                  <span className="calendar-event-title">
                    {getCustomerName(booking)}
                  </span>

                  <span className="calendar-event-trip">
                    {getTripName(booking)}
                  </span>
                </button>
              ))}

            {dayBookings.length > 3 && (
              <span className="calendar-more">
                +{dayBookings.length - 3} more
              </span>
            )}
          </div>
        </div>
      );
    }

    return calendarDays;
  };

  /*
    Bookings belonging to selected month
  */
  const monthBookings = [];

  for (const booking of bookings) {
    const bookingDate = getBookingDate(booking);

    if (bookingDate) {
      const dateObject = new Date(bookingDate);

      if (
        !Number.isNaN(dateObject.getTime()) &&
        dateObject.getMonth() === month &&
        dateObject.getFullYear() === year
      ) {
        monthBookings.push(booking);
      }
    }
  }

  /*
    Month statistics
  */
  let confirmedCount = 0;
  let pendingCount = 0;
  let cancelledCount = 0;

  for (const booking of monthBookings) {
    if (booking.status === "Confirmed") {
      confirmedCount += 1;
    }

    if (booking.status === "Pending") {
      pendingCount += 1;
    }

    if (booking.status === "Cancelled") {
      cancelledCount += 1;
    }
  }

  return (
    <div className="calendar-page">
      <Topbar />

      <main className="calendar-content">

        {/* Heading */}
        <div className="calendar-heading">
          <div>
            <div className="calendar-title-row">
              <img
                src={calendarIcon}
                alt="Calendar"
              />

              <h1>Calendar</h1>
            </div>

            <p>
              Manage bookings and travel schedules
              month wise.
            </p>
          </div>

          <button
            type="button"
            className="calendar-booking-button"
            onClick={() =>
              navigate("/Bookings/add")
            }
          >
            <img
              src={Add}
              alt="Booking"
            />

            Add Booking
          </button>
        </div>

        {/* Month Filter */}
        <section className="calendar-filter-card">

          <div className="calendar-filter-title">
            <div className="calendar-filter-icon">
              <img
                src={filterIcon}
                alt="Filter"
              />
            </div>

            <div>
              <h3>Filter Calendar</h3>
              <p>
                Select month and year to view bookings.
              </p>
            </div>
          </div>

          <div className="calendar-filter-controls">

            <div className="calendar-filter-group">
              <label>Month</label>

              <select
                value={month}
                onChange={handleMonthChange}
              >
                {monthNames.map(
                  (monthName, index) => (
                    <option
                      value={index}
                      key={monthName}
                    >
                      {monthName}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="calendar-filter-group">
              <label>Year</label>

              <select
                value={year}
                onChange={handleYearChange}
              >
                {availableYears.map(
                  (availableYear) => (
                    <option
                      value={availableYear}
                      key={availableYear}
                    >
                      {availableYear}
                    </option>
                  )
                )}
              </select>
            </div>

            <button
              type="button"
              className="calendar-reset-button"
              onClick={goToToday}
            >
              Current Month
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="calendar-stats">

          <div className="calendar-stat-card">
            <div className="calendar-stat-icon purple">
              <img
                src={bookingIcon}
                alt=""
              />
            </div>

            <div>
              <span>Total Bookings</span>

              <strong>
                {monthBookings.length}
              </strong>

              <small>
                {monthNames[month]} {year}
              </small>
            </div>
          </div>

          <div className="calendar-stat-card">
            <div className="calendar-stat-icon green">
              <img
                src={Confirmed}
                alt=""
              />
            </div>

            <div>
              <span>Confirmed</span>

              <strong>
                {confirmedCount}
              </strong>

              <small>
                Confirmed bookings
              </small>
            </div>
          </div>

          <div className="calendar-stat-card">
            <div className="calendar-stat-icon orange">
              <img
                src={Pending}
                alt=""
              />
            </div>

            <div>
              <span>Pending</span>

              <strong>
                {pendingCount}
              </strong>

              <small>
                Waiting for confirmation
              </small>
            </div>
          </div>

          <div className="calendar-stat-card">
            <div className="calendar-stat-icon red">
              <img
                src={Cancelled}
                alt=""
              />
            </div>

            <div>
              <span>Cancelled</span>

              <strong>
                {cancelledCount}
              </strong>

              <small>
                Cancelled bookings
              </small>
            </div>
          </div>

        </section>

        {/* Calendar */}
        <section className="calendar-card">

          <div className="calendar-toolbar">

            <button
              type="button"
              className="calendar-nav-button"
              onClick={previousMonth}
            >
              <img
                src={arrowLeft}
                alt="Previous"
              />
            </button>

            <div className="calendar-month-title">
              <h2>
                {monthNames[month]} {year}
              </h2>
            </div>

            <button
              type="button"
              className="calendar-nav-button"
              onClick={nextMonth}
            >
              <img
                src={arrowRight}
                alt="Next"
              />
            </button>

          </div>

          <div className="calendar-week-header">
            {weekDays.map((day) => (
              <div key={day}>
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-days">
            {renderCalendarDays()}
          </div>

        </section>

        {/* Upcoming Bookings */}
        <section className="calendar-upcoming">

          <div className="calendar-section-heading">
            <div>
              <h2>
                {monthNames[month]} Bookings
              </h2>

              <p>
                Bookings scheduled for this month.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/Bookings")
              }
            >
              View All
            </button>
          </div>

          {monthBookings.length === 0 ? (
            <EmptyState
              icon={calendarIcon}
              title="No bookings this month"
              message={`There are no bookings scheduled for ${monthNames[month]} ${year}.`}
              buttonText="Create Booking"
              onAction={() =>
                navigate("/Bookings/add")
              }
            />
          ) : (
            <div className="calendar-upcoming-list">

              {monthBookings
                .slice(0, 8)
                .map((booking) => {

                  const bookingDate =
                    getBookingDate(booking);

                  const dateObject =
                    new Date(bookingDate);

                  return (
                    <div
                      className="calendar-upcoming-item"
                      key={booking.id}
                    >

                      <div className="calendar-upcoming-date">
                        <strong>
                          {dateObject.getDate()}
                        </strong>

                        <span>
                          {monthNames[
                            dateObject.getMonth()
                          ].slice(0, 3)}
                        </span>
                      </div>

                      <div className="calendar-upcoming-info">

                        <h3>
                          {getCustomerName(
                            booking
                          )}
                        </h3>

                        <p>
                          {getTripName(booking)}
                        </p>

                        <span>
                          Booking ID:{" "}
                          {booking.bookingId ||
                            `BK-${booking.id}`}
                        </span>

                      </div>

                      <div className="calendar-upcoming-status">
                        <StatusBadge
                          status={
                            booking.status ||
                            "Pending"
                          }
                        />
                      </div>

                      <button
                        type="button"
                        className="calendar-view-button"
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

                        View
                      </button>

                    </div>
                  );
                })}

            </div>
          )}

        </section>

      </main>
    </div>
  );
}

export default Calendar;