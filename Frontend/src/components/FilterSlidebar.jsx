
import "../style/filterSidebar.css";

import React, { useState } from "react";

const FilterSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Filter button to open sidebar */}
      {!open && (
        <button className="filter-toggle-btn" onClick={() => setOpen(true)}>
          Filter
        </button>
      )}

      {/* Sidebar overlay and content */}
      {open && (
        <div className="filter-overlay" onClick={() => setOpen(false)}>
          <aside
            className="filter"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="filter-header">
              <h3>Filter</h3>
              <button
                className="close-btn"
                aria-label="Close"
                onClick={() => setOpen(false)}
              >
                &times;
              </button>
            </div>

            <div className="filter-section">
              <h4 className="filter-label">Sort By</h4>
              <div className="filter-group radio-group">
                <label><input type="radio" name="sort" defaultChecked /> Featured</label>
                <label><input type="radio" name="sort" /> Newest</label>
                <label><input type="radio" name="sort" /> Price: High-Low</label>
                <label><input type="radio" name="sort" /> Price: Low-High</label>
              </div>
            </div>

            <hr className="filter-divider" />

            <div className="filter-section">
              <h4 className="filter-label">Gender (1)</h4>
              <div className="filter-group checkbox-group">
                <label><input type="checkbox" defaultChecked /> Men</label>
                <label><input type="checkbox" /> Women</label>
              </div>
            </div>

            <hr className="filter-divider" />

            <div className="filter-section">
              <h4 className="filter-label">Shop By Price</h4>
              {/* Add price slider or options here if needed */}
            </div>

            <div className="filter-actions">
              <button className="clear-btn">Clear (2)</button>
              <button className="apply-btn">Apply</button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default FilterSidebar;
