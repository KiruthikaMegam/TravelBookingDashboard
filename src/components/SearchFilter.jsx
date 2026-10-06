import React from "react";

import "./SearchFilter.css";

import searchIcon from "../assets/search.png";
import filterIcon from "../assets/filter.png";
import sortIcon from "../assets/sort.png";

function SearchFilter({
  search = "",
  onSearchChange = () => {},
  searchPlaceholder = "Search...",

  filters = [],
  selectedFilters = {},
  onFilterChange = () => {},

  sortOptions = [],
  sortValue = "",
  onSortChange = () => {},

  onClear,
}) {
  return (
    <div className="travel-search-filter">

      {/* SEARCH */}

      <div className="travel-search-box">

        <img
          src={searchIcon}
          alt="Search"
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder={searchPlaceholder}
        />

      </div>

      {/* FILTER AREA */}

      <div className="travel-filter-area">

        {filters.map((filter) => {

          const filterKey =
            filter.key || filter.name;

          const selectedValue =
            selectedFilters[filterKey] || "All";

          return (
            <div
              className="travel-filter-item"
              key={filterKey}
            >

              <img
                src={filterIcon}
                alt=""
              />

              <select
                value={selectedValue}
                onChange={(event) =>
                  onFilterChange(
                    filterKey,
                    event.target.value
                  )
                }
              >

                <option value="All">
                  {filter.label}
                </option>

                {(filter.options || []).map(
                  (option, index) => {

                    /*
                      Supports both:

                      "Confirmed"

                      and

                      {
                        value: "Confirmed",
                        label: "Confirmed"
                      }
                    */

                    const optionValue =
                      typeof option === "object"
                        ? option.value
                        : option;

                    const optionLabel =
                      typeof option === "object"
                        ? option.label
                        : option;

                    return (
                      <option
                        key={`${optionValue}-${index}`}
                        value={optionValue}
                      >
                        {optionLabel}
                      </option>
                    );
                  }
                )}

              </select>

            </div>
          );
        })}

        {/* SORT */}

        {sortOptions.length > 0 && (
          <div className="travel-filter-item">

            <img
              src={sortIcon}
              alt=""
            />

            <select
              value={sortValue}
              onChange={(event) =>
                onSortChange(
                  event.target.value
                )
              }
            >

              <option value="">
                Sort By
              </option>

              {sortOptions.map(
                (option, index) => {

                  const optionValue =
                    typeof option === "object"
                      ? option.value
                      : option;

                  const optionLabel =
                    typeof option === "object"
                      ? option.label
                      : option;

                  return (
                    <option
                      key={`${optionValue}-${index}`}
                      value={optionValue}
                    >
                      {optionLabel}
                    </option>
                  );
                }
              )}

            </select>

          </div>
        )}

        {/* CLEAR */}

        {onClear && (
          <button
            type="button"
            className="travel-clear-filter-button"
            onClick={onClear}
          >
            Clear
          </button>
        )}

      </div>

    </div>
  );
}

export default SearchFilter;