
import React, { useEffect, useState } from "react";

import {
  getSellerMetrics,
  getSellerOrders,
  getSellerProducts
} from "../api/dashboard.api.js";

import "../style/Dashboard.css";

const formatCurrency = (amount = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
};

function OrdersTable({ orders = [] }) {
  if (!orders.length) {
    return (
      <div className="seller-empty">
        No orders found yet.
      </div>
    );
  }

  return (
    <div className="seller-table-wrapper">
      <table className="seller-table">
        <thead>
          <tr>
            <th>ORDER ID</th>
            <th>CUSTOMER</th>
            <th>DATE</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          {orders.slice(0, 8).map((order) => {
            const amount = (order.items || []).reduce(
              (sum, item) =>
                sum +
                (item.price?.amount || 0) *
                  (item.quantity || 1),
              0
            );

            return (
              <tr key={order._id}>
                <td className="seller-order-id">
                  #{String(order._id).slice(-8).toUpperCase()}
                </td>

                <td>
                  {order.user?.username ||
                    order.user?.email ||
                    "Customer"}
                </td>

                <td>{formatDate(order.createdAt)}</td>

                <td className="seller-order-amount">
                  {formatCurrency(amount)}
                </td>

                <td>
                  <span
                    className={`seller-order-status ${
                      String(order.status || "pending").toLowerCase()
                    }`}
                  >
                    {order.status || "PENDING"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [metrics, setMetrics] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        const [metricsData, ordersData, productsData] =
          await Promise.all([
            getSellerMetrics(),
            getSellerOrders(),
            getSellerProducts()
          ]);

        setMetrics(metricsData);
        setOrders(ordersData || []);
        setProducts(productsData || []);

      } catch (err) {
        console.error(
          "SELLER DASHBOARD ERROR:",
          err.response?.data || err.message
        );

        setError(
          err.response?.data?.message ||
          "Unable to load dashboard data. Please login again."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const pendingOrders = orders.filter((order) =>
    ["PENDING", "CONFIRMED", "PROCESSING"].includes(
      String(order.status).toUpperCase()
    )
  ).length;

  const metricCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(metrics?.revenue),
      icon: "₹",
      note: "From confirmed, shipped and delivered orders"
    },
    {
      title: "Total Sales",
      value: metrics?.sales ?? 0,
      icon: "↗",
      note: "Total items sold"
    },
    {
      title: "Total Products",
      value: products.length,
      icon: "▣",
      note: "Your listed products"
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: "◷",
      note: "Orders requiring attention"
    }
  ];

  const navigation = [
    { name: "Overview", icon: "⌂" },
    { name: "Orders", icon: "▤" },
    { name: "Products", icon: "▣" }
  ];

  const changeTab = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  if (loading) {
    return (
      <div className="seller-dashboard">
        <main className="seller-main">
          <div className="seller-content">
            <p className="seller-muted">
              Loading your seller dashboard...
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="seller-dashboard">

      {sidebarOpen && (
        <div
          className="seller-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`seller-sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="seller-brand">
          <div className="seller-brand-icon">N</div>

          <div>
            <h2>NIKE <span>STORE</span></h2>
            <p>SELLER PANEL</p>
          </div>
        </div>

        <p className="seller-nav-label">MENU</p>

        <nav className="seller-navigation">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={
                activeTab === item.name ? "active" : ""
              }
              onClick={() => changeTab(item.name)}
            >
              <span className="seller-nav-icon">
                {item.icon}
              </span>

              {item.name}

              {activeTab === item.name && (
                <span className="nav-active-dot" />
              )}
            </button>
          ))}
        </nav>

        <div className="seller-sidebar-bottom">
          <div className="seller-help-card">
            <span>?</span>
            <h4>Need Help?</h4>
            <p>Contact support if you need assistance.</p>
          </div>

          <div className="seller-sidebar-footer">
            <div className="seller-avatar">S</div>

            <div className="seller-profile-info">
              <strong>Seller Account</strong>
              <span>Seller Dashboard</span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="seller-main">

        <header className="seller-topbar">
          <div className="seller-topbar-left">
            <button
              className="seller-menu-btn"
              onClick={() => setSidebarOpen(true)}
            >
              ☰
            </button>

            <div>
              <p className="seller-breadcrumb">
                Dashboard / <span>{activeTab}</span>
              </p>

              <h1>{activeTab}</h1>
            </div>
          </div>

          <div className="seller-topbar-right">
            <span className="seller-date">{currentDate}</span>

            <div className="seller-live-status">
              <span />
              Live
            </div>

            <div className="seller-top-avatar">S</div>
          </div>
        </header>

        <div className="seller-content">

          {error && (
            <div className="seller-error">
              {error}
            </div>
          )}

          {!error && (
            <>
              {/* OVERVIEW */}
              {activeTab === "Overview" && (
                <>
                  <section className="seller-welcome">
                    <div>
                      <span className="seller-eyebrow">
                        SELLER OVERVIEW
                      </span>

                      <h2>
                        Welcome back, <span>Seller.</span>
                      </h2>

                      <p>
                        Here's what's happening with your store.
                      </p>
                    </div>

                    <button
                      className="seller-primary-btn"
                      onClick={() => changeTab("Products")}
                    >
                      View Products →
                    </button>
                  </section>

                  <section className="seller-metrics-grid">
                    {metricCards.map((card) => (
                      <div
                        className="seller-metric-card"
                        key={card.title}
                      >
                        <div className="seller-metric-top">
                          {card.title}

                          <span className="seller-metric-icon">
                            {card.icon}
                          </span>
                        </div>

                        <h3>{card.value}</h3>

                        <div className="seller-metric-bottom">
                          {card.note}
                        </div>
                      </div>
                    ))}
                  </section>

                  <section className="seller-middle-grid">

                    <div className="seller-panel">
                      <div className="seller-panel-heading">
                        <div>
                          <span className="seller-section-label">
                            PERFORMANCE
                          </span>

                          <h3>Top Selling Products</h3>
                        </div>
                      </div>

                      {metrics?.topProducts?.length ? (
                        <div className="seller-product-list">
                          {metrics.topProducts.map((product) => (
                            <div
                              className="seller-product-row"
                              key={product.id}
                            >
                              <div className="seller-product-image">
                                ▣
                              </div>

                              <div className="seller-product-name">
                                <strong>{product.title}</strong>
                                <span>Product performance</span>
                              </div>

                              <span className="seller-product-stock">
                                {product.sold} sold
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="seller-muted">
                          No product sales available yet.
                        </p>
                      )}
                    </div>

                    <div className="seller-panel">
                      <div className="seller-panel-heading">
                        <div>
                          <span className="seller-section-label">
                            ORDER SUMMARY
                          </span>

                          <h3>Orders Overview</h3>
                        </div>
                      </div>

                      <div className="seller-order-total">
                        <h2>{orders.length}</h2>
                        <span>Total Orders</span>
                      </div>

                      <div className="seller-status-row">
                        <span className="status-indicator processing" />
                        Active / Processing
                        <strong>{pendingOrders}</strong>
                      </div>

                      <div className="seller-status-row">
                        <span className="status-indicator delivered" />
                        Delivered
                        <strong>
                          {
                            orders.filter(
                              (o) =>
                                String(o.status).toUpperCase() ===
                                "DELIVERED"
                            ).length
                          }
                        </strong>
                      </div>

                      <div className="seller-status-row">
                        <span className="status-indicator pending" />
                        Cancelled
                        <strong>
                          {
                            orders.filter(
                              (o) =>
                                String(o.status).toUpperCase() ===
                                "CANCELLED"
                            ).length
                          }
                        </strong>
                      </div>
                    </div>
                  </section>

                  <section className="seller-panel seller-recent-panel">
                    <div className="seller-panel-heading">
                      <div>
                        <span className="seller-section-label">
                          LATEST ACTIVITY
                        </span>

                        <h3>Recent Orders</h3>
                      </div>

                      <button
                        className="seller-text-btn"
                        onClick={() => changeTab("Orders")}
                      >
                        View All →
                      </button>
                    </div>

                    <OrdersTable orders={orders} />
                  </section>
                </>
              )}

              {/* ORDERS */}
              {activeTab === "Orders" && (
                <section className="seller-panel seller-page-panel">
                  <div className="seller-panel-heading">
                    <div>
                      <span className="seller-section-label">
                        ORDER MANAGEMENT
                      </span>

                      <h3>All Seller Orders</h3>
                    </div>

                    <span className="seller-muted">
                      {orders.length} orders
                    </span>
                  </div>

                  <OrdersTable orders={orders} />
                </section>
              )}

              {/* PRODUCTS */}
              {activeTab === "Products" && (
                <section className="seller-panel seller-page-panel">
                  <div className="seller-panel-heading">
                    <div>
                      <span className="seller-section-label">
                        INVENTORY
                      </span>

                      <h3>My Products</h3>
                    </div>

                    <span className="seller-muted">
                      {products.length} products
                    </span>
                  </div>

                  {products.length ? (
                    <div className="seller-product-list">
                      {products.map((product) => (
                        <div
                          className="seller-product-row"
                          key={product._id}
                        >
                          <div className="seller-product-image">
                            ▣
                          </div>

                          <div className="seller-product-name">
                            <strong>{product.title}</strong>
                            <span>
                              {product.category || "Product"}
                            </span>
                          </div>

                          <span className="seller-product-price">
                            {formatCurrency(
                              product.price?.amount ??
                              product.price ??
                              0
                            )}
                          </span>

                          <span className="seller-product-stock">
                            Stock: {product.stock ?? "N/A"}
                          </span>

                          <span className="seller-product-status product-active">
                            {product.status || "Active"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="seller-muted">
                      You have not added any products yet.
                    </p>
                  )}
                </section>
              )}

              <footer className="seller-footer">
                <span>© {new Date().getFullYear()} Nike Store</span>
                <span>Seller Dashboard</span>
              </footer>
            </>
          )}

        </div>
      </main>
    </div>
  );
}

export default Dashboard;
