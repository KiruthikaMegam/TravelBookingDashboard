import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useTravel } from "../context/TravelContext";

import Toast from "../components/Toast";

import "./TripForm.css";

function TripAdd() {
  const navigate = useNavigate();

  const { addTrip } = useTravel();

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    country: "",
    image: "",
    startDate: "",
    endDate: "",
    duration: "",
    price: "",
    seats: "",
    bookedSeats: "0",
    status: "Upcoming",
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = "Trip title is required.";
    }

    if (!formData.destination) {
      newErrors.destination = "Destination is required.";
    }

    if (!formData.country) {
      newErrors.country = "Country is required.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required.";
    }

    if (
      formData.startDate &&
      formData.endDate &&
      formData.endDate < formData.startDate
    ) {
      newErrors.endDate =
        "End date cannot be before start date.";
    }

    if (!formData.duration) {
      newErrors.duration = "Duration is required.";
    }

    if (!formData.price) {
      newErrors.price = "Price is required.";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0.";
    }

    if (!formData.seats) {
      newErrors.seats = "Total seats are required.";
    } else if (Number(formData.seats) <= 0) {
      newErrors.seats =
        "Total seats must be greater than 0.";
    }

    if (
      Number(formData.bookedSeats) >
      Number(formData.seats)
    ) {
      newErrors.bookedSeats =
        "Booked seats cannot exceed total seats.";
    }

    if (!formData.category) {
      newErrors.category = "Category is required.";
    }

    if (!formData.description) {
      newErrors.description =
        "Trip description is required.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    addTrip({
      title: formData.title,
      destination: formData.destination,
      country: formData.country,
      image: formData.image,
      startDate: formData.startDate,
      endDate: formData.endDate,
      duration: formData.duration,
      price: Number(formData.price),
      seats: Number(formData.seats),
      bookedSeats: Number(formData.bookedSeats),
      status: formData.status,
      category: formData.category,
      description: formData.description,
    });

    setToast({
      show: true,
      type: "success",
      message: "Trip added successfully.",
    });

    setTimeout(() => {
      navigate("/Trips");
    }, 1000);
  };

  return (
    <div className="trip-form-page">
      <div className="trip-form-content">

        <div className="trip-form-header">
          <button
            type="button"
            className="trip-form-back"
            onClick={() => navigate("/Trips")}
          >
            ← Back to Trips
          </button>

          <h1>Add Trip</h1>

          <p>
            Create a new travel package for your customers.
          </p>
        </div>

        <form
          className="trip-form-card"
          onSubmit={handleSubmit}
        >
          {/* BASIC DETAILS */}
          <div className="trip-form-section">
            <h2 className="trip-form-section-title">
              Basic Trip Details
            </h2>

            <div className="trip-form-row">
              <div className="trip-form-group">
                <label>
                  Trip Title <span className="trip-required">*</span>
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter trip title"
                />

                {errors.title ? (
                  <p className="trip-form-error">
                    {errors.title}
                  </p>
                ) : null}
              </div>

              <div className="trip-form-group">
                <label>
                  Destination <span className="trip-required">*</span>
                </label>

                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Enter destination"
                />

                {errors.destination ? (
                  <p className="trip-form-error">
                    {errors.destination}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="trip-form-row">
              <div className="trip-form-group">
                <label>
                  Country <span className="trip-required">*</span>
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                />

                {errors.country ? (
                  <p className="trip-form-error">
                    {errors.country}
                  </p>
                ) : null}
              </div>

              <div className="trip-form-group">
                <label>Image URL</label>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          {/* DATE DETAILS */}
          <div className="trip-form-section">
            <h2 className="trip-form-section-title">
              Schedule
            </h2>

            <div className="trip-form-row">
              <div className="trip-form-group">
                <label>
                  Start Date <span className="trip-required">*</span>
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />

                {errors.startDate ? (
                  <p className="trip-form-error">
                    {errors.startDate}
                  </p>
                ) : null}
              </div>

              <div className="trip-form-group">
                <label>
                  End Date <span className="trip-required">*</span>
                </label>

                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />

                {errors.endDate ? (
                  <p className="trip-form-error">
                    {errors.endDate}
                  </p>
                ) : null}
              </div>

              <div className="trip-form-group">
                <label>
                  Duration <span className="trip-required">*</span>
                </label>

                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="6 Days / 5 Nights"
                />

                {errors.duration ? (
                  <p className="trip-form-error">
                    {errors.duration}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* PRICE AND SEATS */}
          <div className="trip-form-section">
            <h2 className="trip-form-section-title">
              Pricing & Availability
            </h2>

            <div className="trip-form-row">
              <div className="trip-form-group">
                <label>
                  Price <span className="trip-required">*</span>
                </label>

                <input
                  type="number"
                  name="price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                />

                {errors.price ? (
                  <p className="trip-form-error">
                    {errors.price}
                  </p>
                ) : null}
              </div>

              <div className="trip-form-group">
                <label>
                  Total Seats <span className="trip-required">*</span>
                </label>

                <input
                  type="number"
                  name="seats"
                  min="1"
                  value={formData.seats}
                  onChange={handleChange}
                  placeholder="Enter total seats"
                />

                {errors.seats ? (
                  <p className="trip-form-error">
                    {errors.seats}
                  </p>
                ) : null}
              </div>

              <div className="trip-form-group">
                <label>Booked Seats</label>

                <input
                  type="number"
                  name="bookedSeats"
                  min="0"
                  value={formData.bookedSeats}
                  onChange={handleChange}
                  placeholder="0"
                />

                {errors.bookedSeats ? (
                  <p className="trip-form-error">
                    {errors.bookedSeats}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          {/* CATEGORY AND STATUS */}
          <div className="trip-form-section">
            <h2 className="trip-form-section-title">
              Category & Status
            </h2>

            <div className="trip-form-row">
              <div className="trip-form-group">
                <label>
                  Category <span className="trip-required">*</span>
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">
                    Select category
                  </option>
                  <option value="Romantic">
                    Romantic
                  </option>
                  <option value="Luxury">
                    Luxury
                  </option>
                  <option value="Adventure">
                    Adventure
                  </option>
                  <option value="Heritage">
                    Heritage
                  </option>
                  <option value="City">
                    City
                  </option>
                  <option value="Culture">
                    Culture
                  </option>
                  <option value="Beach">
                    Beach
                  </option>
                  <option value="Food">
                    Food
                  </option>
                </select>

                {errors.category ? (
                  <p className="trip-form-error">
                    {errors.category}
                  </p>
                ) : null}
              </div>

              <div className="trip-form-group">
                <label>Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Upcoming">
                    Upcoming
                  </option>
                  <option value="Ongoing">
                    Ongoing
                  </option>
                  <option value="Completed">
                    Completed
                  </option>
                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="trip-form-section">
            <h2 className="trip-form-section-title">
              Description
            </h2>

            <div className="trip-form-group full">
              <label>
                Trip Description{" "}
                <span className="trip-required">*</span>
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the trip..."
              />

              {errors.description ? (
                <p className="trip-form-error">
                  {errors.description}
                </p>
              ) : null}
            </div>
          </div>

          {/* ACTIONS */}
          <div className="trip-form-actions">
            <button
              type="button"
              className="trip-form-cancel"
              onClick={() => navigate("/Trips")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="trip-form-submit"
            >
              Add Trip
            </button>
          </div>
        </form>
      </div>

      {toast.show ? (
        <Toast
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
      ) : null}
    </div>
  );
}

export default TripAdd;