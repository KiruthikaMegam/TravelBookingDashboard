import React from "react";

import "./Pagination.css";

import arrowLeftIcon from "../assets/arrow-left.png";
import arrowRightIcon from "../assets/arrow-right.png";

function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = [];

  for (let page = 1; page <= totalPages; page++) {
    pages.push(page);
  }

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="travel-pagination">
      <button
        type="button"
        className="travel-pagination-arrow"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <img
          src={arrowLeftIcon}
          alt="Previous"
        />

        <span>Previous</span>
      </button>

      <div className="travel-pagination-pages">
        {pages.map((page) => (
          <button
            type="button"
            key={page}
            className={
              page === currentPage
                ? "travel-pagination-page active"
                : "travel-pagination-page"
            }
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="travel-pagination-arrow"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <span>Next</span>

        <img
          src={arrowRightIcon}
          alt="Next"
        />
      </button>
    </div>
  );
}

export default Pagination;