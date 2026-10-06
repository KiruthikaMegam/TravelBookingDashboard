import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./DestinationForm.css";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import Loader from "../components/Loader";
import Toast from "../components/Toast";

import destinationIcon from "../assets/destination.png";
import locationIcon from "../assets/location.png";
import editIcon from "../assets/edit.png";

function DestinationEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    destinations,
    updateDestination,
  } = useTravel();

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    image: "",
    rating: "",
    trips: "",
    price: "",
    status: "Active",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });

  useEffect(() => {
    let selectedDestination = null;

    for (const destination of destinations) {
      if (String(destination.id) === String(id)) {
        selectedDestination = destination;
        break;
      }
    }

    if (selectedDestination) {
      setFormData({
        name: selectedDestination.name || "",
        country: selectedDestination.country || "",
        image: selectedDestination.image || "",
        rating: selectedDestination.rating || "",
        trips: selectedDestination.trips || "",
        price: selectedDestination.price || "",
        status: selectedDestination.status || "Active",
        description:
          selectedDestination.description || "",
      });
    }

    setLoading(false);
  }, [destinations, id]);

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Destination name is required.";
    }

    if (!formData.country) {
      newErrors.country = "Country is required.";
    }

    if (!formData.image) {
      newErrors.image = "Image URL is required.";
    }

    if (!formData.rating) {
      newErrors.rating = "Rating is required.";
    } else if (
      Number(formData.rating) < 0 ||
      Number(formData.rating) > 5
    ) {
      newErrors.rating =
        "Rating must be between 0 and 5.";
    }

    if (!formData.trips) {
      newErrors.trips = "Number of trips is required.";
    }

    if (!formData.price) {
      newErrors.price = "Starting price is required.";
    }

    if (!formData.description) {
      newErrors.description =
        "Destination description is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setToast({
        message: "Please correct the highlighted fields.",
        type: "error",
      });

      return;
    }

    const updatedDestination = {
      name: formData.name,
      country: formData.country,
      image: formData.image,
      rating: Number(formData.rating),
      trips: Number(formData.trips),
      price: Number(formData.price),
      status: formData.status,
      description: formData.description,
    };

    updateDestination(
      id,
      updatedDestination
    );

    setToast({
      message: "Destination updated successfully.",
      type: "success",
    });

    setTimeout(() => {
      navigate(`/Destinations/View/${id}`);
    }, 700);
  };

  if (loading) {
    return (
      <div className="destination-form-page">
        <Topbar />

        <main className="destination-form-main">
          <Loader
            message="Loading Destination..."
            description="Please wait while we load destination information."
          />
        </main>
      </div>
    );
  }

  if (!formData.name) {
    return (
      <div className="destination-form-page">
        <Topbar />

        <main className="destination-form-main">

          <div className="destination-form-card">
            <h2>Destination Not Found</h2>

            <p>
              The requested destination could
              not be found.
            </p>

            <button
              type="button"
              className="destination-submit-button"
              onClick={() =>
                navigate("/Destinations")
              }
            >
              Back to Destinations
            </button>
          </div>

        </main>
      </div>
    );
  }

  return (
    <div className="destination-form-page">
      <Topbar />

      <main className="destination-form-main">

        <section className="destination-form-header">

          <div className="destination-form-heading">

            <div className="destination-form-heading-icon">
              <img
                src={editIcon}
                alt=""
              />
            </div>

            <div>
              <h1>Edit Destination</h1>

              <p>
                Update destination information.
              </p>
            </div>

          </div>

          <button
            type="button"
            className="destination-back-button"
            onClick={() =>
              navigate("/Destinations")
            }
          >
            Back to Destinations
          </button>

        </section>

        <form
          className="destination-form-card"
          onSubmit={handleSubmit}
        >

          <section className="destination-form-section">

            <div className="destination-form-section-title">

              <img
                src={destinationIcon}
                alt=""
              />

              <h2>Destination Information</h2>

            </div>

            <div className="destination-form-fields">

              <div className="destination-form-group">

                <label>
                  Destination Name <span>*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter destination name"
                />

                {errors.name ? (
                  <small className="destination-form-error">
                    {errors.name}
                  </small>
                ) : null}

              </div>

              <div className="destination-form-group">

                <label>
                  Country <span>*</span>
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                />

                {errors.country ? (
                  <small className="destination-form-error">
                    {errors.country}
                  </small>
                ) : null}

              </div>

              <div className="destination-form-group full-width">

                <label>
                  Image URL <span>*</span>
                </label>

                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />

                {errors.image ? (
                  <small className="destination-form-error">
                    {errors.image}
                  </small>
                ) : null}

                {formData.image ? (
                  <div className="destination-image-preview">
                    <img
                      src={formData.image}
                      alt={formData.name}
                    />
                  </div>
                ) : null}

              </div>

              <div className="destination-form-group">

                <label>
                  Rating <span>*</span>
                </label>

                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  min="0"
                  max="5"
                  step="0.1"
                />

                {errors.rating ? (
                  <small className="destination-form-error">
                    {errors.rating}
                  </small>
                ) : null}

              </div>

              <div className="destination-form-group">

                <label>
                  Available Trips <span>*</span>
                </label>

                <input
                  type="number"
                  name="trips"
                  value={formData.trips}
                  onChange={handleChange}
                  min="0"
                />

                {errors.trips ? (
                  <small className="destination-form-error">
                    {errors.trips}
                  </small>
                ) : null}

              </div>

              <div className="destination-form-group">

                <label>
                  Starting Price <span>*</span>
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                />

                {errors.price ? (
                  <small className="destination-form-error">
                    {errors.price}
                  </small>
                ) : null}

              </div>

              <div className="destination-form-group">

                <label>
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>

              </div>

            </div>

          </section>

          <section className="destination-form-section">

            <div className="destination-form-section-title">

              <img
                src={locationIcon}
                alt=""
              />

              <h2>Description</h2>

            </div>

            <div className="destination-form-fields">

              <div className="destination-form-group full-width">

                <label>
                  Destination Description{" "}
                  <span>*</span>
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter destination description..."
                />

                {errors.description ? (
                  <small className="destination-form-error">
                    {errors.description}
                  </small>
                ) : null}

              </div>

            </div>

          </section>

          <div className="destination-form-actions">

            <button
              type="button"
              className="destination-cancel-button"
              onClick={() =>
                navigate(`/Destinations/View/${id}`)
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="destination-submit-button"
            >
              <img
                src={editIcon}
                alt=""
                style={{
                  width: "15px",
                  height: "15px",
                  filter: "brightness(0) invert(1)",
                  marginRight: "6px",
                  verticalAlign: "middle",
                }}
              />
              Update Destination
            </button>

          </div>

        </form>

      </main>

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

export default DestinationEdit;