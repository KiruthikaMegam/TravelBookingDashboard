import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./DestinationView.css";

import { useTravel } from "../context/TravelContext";

import Topbar from "../components/Topbar";
import Loader from "../components/Loader";
import StatusBadge from "../components/StatusBadge";

import destinationIcon from "../assets/destination.png";
import locationIcon from "../assets/location.png";
import priceIcon from "../assets/totalAmount.png";
import editIcon from "../assets/edit.png";
import arrowLeftIcon from "../assets/arrow-left.png";

function DestinationView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { destinations } = useTravel();

  const [destination, setDestination] =
    useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let selectedDestination = null;

    for (const item of destinations) {
      if (String(item.id) === String(id)) {
        selectedDestination = item;
        break;
      }
    }

    setDestination(selectedDestination);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [destinations, id]);

  const formatPrice = (price) => {
    return `$${Number(price || 0).toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="destination-view-page">
        <Topbar />

        <main className="destination-view-main">
          <Loader
            message="Loading Destination..."
            description="Please wait while we load the destination details."
          />
        </main>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="destination-view-page">
        <Topbar />

        <main className="destination-view-main">

          <div className="destination-not-found">

            <div className="destination-not-found-icon">
              <img
                src={destinationIcon}
                alt=""
              />
            </div>

            <h2>Destination Not Found</h2>

            <p>
              The destination you are looking
              for does not exist.
            </p>

            <button
              type="button"
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
    <div className="destination-view-page">
      <Topbar />

      <main className="destination-view-main">

        {/* HEADER */}
        <section className="destination-view-header">

          <button
            type="button"
            className="destination-view-back"
            onClick={() =>
              navigate("/Destinations")
            }
          >
            <img
              src={arrowLeftIcon}
              alt=""
            />
            Back
          </button>

          <div className="destination-view-actions">

            <button
              type="button"
              className="destination-view-edit"
              onClick={() =>
                navigate(
                  `/Destinations/Edit/${destination.id}`
                )
              }
            >
              <img
                src={editIcon}
                alt=""
              />
              Edit Destination
            </button>

          </div>

        </section>

        {/* MAIN CARD */}
        <section className="destination-details-card">

          {/* IMAGE */}
          <div className="destination-details-image-area">

            <img
              src={destination.image}
              alt={destination.name}
              className="destination-details-image"
            />

            <div className="destination-details-rating">
              ★{" "}
              {Number(
                destination.rating || 0
              ).toFixed(1)}
            </div>

          </div>

          {/* DETAILS */}
          <div className="destination-details-content">

            <div className="destination-details-top">

              <div>

                <div className="destination-details-status">
                  <StatusBadge
                    status={
                      destination.status
                    }
                  />
                </div>

                <h1>{destination.name}</h1>

                <div className="destination-details-country">
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

            <p className="destination-details-description">
              {destination.description ||
                "No description available for this destination."}
            </p>

            {/* INFORMATION */}
            <div className="destination-details-info">

              <div className="destination-detail-item">

                <div className="destination-detail-icon">
                  <img
                    src={priceIcon}
                    alt=""
                  />
                </div>

                <div>
                  <span>Starting Price</span>
                  <strong>
                    {formatPrice(
                      destination.price
                    )}
                  </strong>
                </div>

              </div>

              <div className="destination-detail-item">

                <div className="destination-detail-icon">
                  <img
                    src={destinationIcon}
                    alt=""
                  />
                </div>

                <div>
                  <span>Available Trips</span>
                  <strong>
                    {destination.trips || 0}
                  </strong>
                </div>

              </div>

              <div className="destination-detail-item">

                <div className="destination-detail-icon">
                  <img
                    src={locationIcon}
                    alt=""
                  />
                </div>

                <div>
                  <span>Country</span>
                  <strong>
                    {destination.country}
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default DestinationView;