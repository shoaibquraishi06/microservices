import { useSelector } from "react-redux";
import product from "./ProfileCard"

export default function CartDrawer() {
   const { items, loading } = useSelector(state => state.cart);

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

      {items.map(item => {
        const product = item.productId;

        if (!product) return null; // 🔐 safety

        return (
          <div key={product._id} className="cart-item">
            <img
              src={product.images?.[0]?.url}
              alt={product.title}
              width="80"
            />

            <div>
              <h4>{product.title}</h4>
              {/* <p>₹{product.price.amount}</p> */}
              <p>Qty: {item.quantity}</p>
            </div>
          </div>
        );
      })}
    </aside>
  );

}

