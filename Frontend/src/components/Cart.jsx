import { useSelector } from "react-redux";

export default function CartDrawer() {
  const { items, loading } = useSelector((state) => state.cart.items);

  if (loading) {
    return <aside className="cart-drawer">Loading...</aside>;
  }

  if (!items || items.length === 0) {
    return (
      <aside className="cart-drawer">
        <h3>Your Cart</h3>
        <p>Cart is empty</p>
      </aside>
    );
  }

  return (
    <aside className="cart-drawer">
      <h3>Your Cart</h3>

      {items.map((item) => (
        <div key={item.product._id} className="cart-item">
          <img
            src={item.images?.[0]?.url}
            alt={item.product.title}
          />

          <div>
            <h4>{item.product.title}</h4>
            <p>₹{item.product.price.amount}</p>
            <p>Qty: {item.quantity}</p>
          </div>
        </div>
      ))}
    </aside>
  );
}
