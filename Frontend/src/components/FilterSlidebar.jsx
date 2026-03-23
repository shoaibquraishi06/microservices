
import "../style/filterSidebar.css";

import React, { useState } from "react";

const FilterSidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      
    <>
    
    {/* button */}
    <button
      className="filter-toggle-btn"
      onClick={() => setOpen(true)}
    >
      Filter
    </button>


    {/* sidebar */}
    {open && (
      <div
        className="filter-overlay"
        onClick={() => setOpen(false)}
      >

        <aside
          className="filter"
          onClick={(e)=> e.stopPropagation()}
        >

          <div className="filter-header">
            <h3>Filter</h3>

            <button
              className="close-btn"
              onClick={() => setOpen(false)}
            >
              ×
            </button>

          </div>


          {/* sort */}
          <h4>Sort By</h4>

          <label>
            <input type="radio" name="sort"/>
            Featured
          </label>

          <label>
            <input type="radio" name="sort"/>
            Newest
          </label>

          <label>
            <input type="radio" name="sort"/>
            Price: High-Low
          </label>

          <label>
            <input type="radio" name="sort"/>
            Price: Low-High
          </label>

          <div className="btns">
            <button className="apply-btn"> Apply</button>
            <button className="clear-btn"> Clear</button>
          </div>

        </aside>

      </div>
    )}

    </>
 
    </>
  );
};

export default FilterSidebar;
