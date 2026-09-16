import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setSearchQuery, clearSearch } from "../feature/Search/search.slice";
import { CiSearch } from "react-icons/ci";
import { searchProducts } from "../feature/Search/search.Thunk";

import "../style/search.css";

const Search = ({ onClose }) => {
  const dispatch = useDispatch();

  const { query, results, loading, error } = useSelector(
    (state) => state.search,
  );

  // ================= SEARCH API =================

  useEffect(() => {
    if (!query.trim()) {
      dispatch(clearSearch());
      return;
    }

    const timer = setTimeout(() => {
      dispatch(searchProducts(query));
    }, 450);

    return () => clearTimeout(timer);
  }, [query, dispatch]);

  // ================= INPUT =================

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // ================= CLOSE =================

  const handleClose = () => {
    dispatch(clearSearch());
    onClose();
  };

  // ================= IMAGE =================

  const getImageUrl = (product) => {
    const image = product?.images?.[0];

    if (!image) return "";

    if (typeof image === "string") {
      return image;
    }

    return image.url || image.path || image.src || "";
  };

  return (
    <div className="search-overlay">
      {/* BACKDROP */}
      <div className="search-backdrop" onClick={handleClose} />

      {/* SEARCH PANEL */}
      <div className="search-panel">
        {/* ================= HEADER ================= */}

        <div className="search-top">
          {/* LOGO */}
          <Link to="/" className="search-logo" onClick={handleClose}>
            <svg viewBox="0 0 100 40" aria-label="Nike">
              <path
                d="M4 25c18 1 34-8 58-18-13 11-29 24-47 25C8 33 3 30 4 25Z"
                fill="currentColor"
              />
            </svg>
          </Link>

          {/* SEARCH INPUT */}

          <div className="search-input-wrapper">
            <CiSearch className="search-input-icon" />

            <input
              type="text"
              autoFocus
              placeholder="Search products..."
              value={query}
              onChange={handleChange}
            />

            {query && (
              <button
                className="search-clear"
                onClick={() => dispatch(setSearchQuery(""))}
              >
                ×
              </button>
            )}
          </div>

          {/* CLOSE */}

          <button className="search-close" onClick={handleClose}>
            Cancel
          </button>
        </div>

        {/* ================= RESULTS ================= */}

        <div className="search-results">
          {query.trim() && (
            <>
              {/* RESULT INFO */}

              <div className="search-result-heading">
                <div>
                  <span>Search results</span>

                  <h2>{query}</h2>
                </div>

                {!loading && !error && <small>{results.length} products</small>}
              </div>

              {/* LOADING */}

              {loading && (
                <div className="search-loading">
                  <div className="search-loader"></div>
                  <p>Finding products...</p>
                </div>
              )}

              {/* ERROR */}

              {!loading && error && (
                <div className="search-empty">
                  <h3>Something went wrong</h3>
                  <p>{error}</p>
                </div>
              )}

              {/* NO RESULT */}

              {!loading && !error && results.length === 0 && (
                <div className="search-empty">
                  <h3>No products found</h3>

                  <p>Try searching for another product.</p>
                </div>
              )}

              {/* PRODUCTS */}

              {!loading && !error && results.length > 0 && (
                <div className="search-product-grid">
                  {results.map((product) => {
                    const imageUrl = getImageUrl(product);

                    return (
                      <Link
                        key={product._id}
                        to={`/product/${product._id}`}
                        className="search-product-card"
                        onClick={handleClose}
                      >
                        {/* IMAGE */}

                        <div className="search-product-image">
                          {imageUrl ? (
                            <img src={imageUrl} alt={product.title} />
                          ) : (
                            <div className="image-placeholder">No Image</div>
                          )}

                          <span className="product-arrow">↗</span>
                        </div>

                        {/* INFO */}

                        <div className="search-product-info">
                          <h3>{product.title}</h3>

                          <p>{product.description}</p>

                          <div className="product-bottom">
                            <strong>₹{product.price?.amount || 0}</strong>

                            {product.stock > 0 ? (
                              <span className="stock">Available</span>
                            ) : (
                              <span className="out-stock">Out of stock</span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
