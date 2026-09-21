import "../style/filterSidebar.css";

import React, { useEffect, useState } from "react";

const FilterSidebar = () => {
  const [open, setOpen] = useState(false);

  // Escape key se close
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Drawer open hone par background scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ================= FILTER BUTTON ================= */}

      <button
        type="button"
        className="filter-toggle-btn"
        onClick={() => setOpen(true)}
        aria-label="Open filters"
      >
        <span>Filter</span>

        <span className="filter-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>


      {/* ================= FILTER DRAWER ================= */}

      <div
        className={`filter-overlay ${open ? "active" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      >

        <aside
          className="filter"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ================= HEADER ================= */}

          <div className="filter-header">

            <div>
              <span className="filter-eyebrow">
                Refine
              </span>

              <h3>Filter</h3>
            </div>

            <button
              type="button"
              className="close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close filter"
            >
              <span></span>
              <span></span>
            </button>

          </div>


          {/* ================= SORT ================= */}

          <div className="filter-section">

            <div className="section-heading">
              <h4>Sort By</h4>
            </div>


            <div className="radio-group">

              <label className="radio-option">
                <input
                  type="radio"
                  name="sort"
                  value="featured"
                  defaultChecked
                />

                <span className="custom-radio"></span>

                <span>Featured</span>
              </label>


              <label className="radio-option">
                <input
                  type="radio"
                  name="sort"
                  value="newest"
                />

                <span className="custom-radio"></span>

                <span>Newest</span>
              </label>


              <label className="radio-option">
                <input
                  type="radio"
                  name="sort"
                  value="high-low"
                />

                <span className="custom-radio"></span>

                <span>Price: High-Low</span>
              </label>


              <label className="radio-option">
                <input
                  type="radio"
                  name="sort"
                  value="low-high"
                />

                <span className="custom-radio"></span>

                <span>Price: Low-High</span>
              </label>

            </div>

          </div>


          {/* ================= ACTIONS ================= */}

          <div className="filter-actions">

            <button
              type="button"
              className="clear-btn"
            >
              Clear
            </button>

            <button
              type="button"
              className="apply-btn"
              onClick={() => setOpen(false)}
            >
              Apply
            </button>

          </div>

        </aside>

      </div>
    </>
  );
};

export default FilterSidebar;