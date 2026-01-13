import { useCart } from "../context/CartContext";
import "../style/cart.css";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price.amount * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="cart-overlay" onClick={onClose} />}

      {/* Drawer */}
      <aside className={`cart-drawer ${isOpen ? "open" : ""}`}>
        <header className="cart-header">
          <h3>Your Cart</h3>
          <button className="close"  onClick={onClose}>✕</button>
        </header>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div>
                    <p className="title">{item.title}</p>
                    <img src={item.images} alt={item.title}  />
                    <p className="qty">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <div>
                    <p className="price">
                      ₹{item.price.amount * item.quantity}
                    </p>
                    <button
                      className="remove"
                      onClick={() =>
                        removeFromCart(item._id)
                      }
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="total">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <button className="checkout-btn">
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
