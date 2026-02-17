import { useSelector } from "react-redux";
import  {useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";
import "../style/cart.css";
import product from "./ProfileCard"

export default function CartDrawer() {
  
   const navigate = useNavigate();

     const productPageHandler = (e) => {
    
     navigate("/product");
   
  };

   const { items, loading } = useSelector(state => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + (item.price?.amount || 0) * item.quantity,
    0
  );

  if (loading) {
    return <aside className="cart-drawer">Loading...</aside>;
  }

  if (!items || items.length === 0) {

   
   


    return (
      <aside className="cart-drawer-conditional">
         
       <div className="bottom">
        <FiShoppingBag size={40} color="#8a8888" />
        <p>Your Cart is empty</p>
        </div>
     
       <button className="cart-btn" onClick={productPageHandler} >
         <span>    Start Shoping </span> 
      </button>



      </aside>
    );
  }

  return (
   <div className="cart-container">

      {/* LEFT SIDE - BAG */}
      <div className="bag-section">
        <h2>Your Cart</h2>

        {items.map((item) => (
          <div key={item.productId} className="cart-item">

            <img
              src={item.image}
              alt={item.title}
              className="product-img"
            />

            <div className="item-details">
              <h3>{item.title}</h3>

              <p>{item.description}</p>

              {/* <p>14 Day Return</p> */}

              {/* <span className="size">Size UK 10</span> */}

              <div className="quantity-box">
                <button>-</button>
                <span>{item.quantity}</span>
                <button>+</button>
              </div>
            </div>

            <div className="price">
              ₹ {item.price?.amount * item.quantity}
            </div>

          </div>
        ))}
      </div>

      {/* RIGHT SIDE - SUMMARY */}
      <div className="summary-section">
        <h2>Summary</h2>

        <div className="summary-row">
          <span>Bag Total</span>
          <span>₹ {total}</span>
        </div>

        <div className="summary-row">
          <span>Sub Total</span>
          <span>₹ {total}</span>
        </div>

        <div className="summary-row">
          <span>Shipping Charges</span>
          <span className="free">Free</span>
        </div>

        <div className="summary-row total">
          <span>You Pay</span>
          <span>₹ {total}</span>
        </div>

        <button
          className="checkout-btn"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Buy
        </button>
      </div>

    </div>









  );

}

   