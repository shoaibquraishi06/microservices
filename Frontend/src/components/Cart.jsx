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

   const { items, loading } = useSelector(state => state.cart);

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
    <aside className="cart-drawer">
      <h3>Your Cart</h3>

      {items.map(item => {
        const product = item.productId;

        if (!product) return null; // 🔐 safety

        return (
          <div key={product._id} className="cart-item">
            <img
              src={product.images?.[0]?.url}
              alt={item.productId.title}
              width="80"
            />

            <div>
              <h4 className="product-Id" > <span className="product-span"> productId :-</span> {item.productId}</h4>
              <h4 className="product-id">  <span className="product-span">orderId :-</span> {item._id}</h4>
              <h4>{product.title}</h4>
              <p>₹{product.price?.amount}</p>
              <p>Qty: {item.quantity}</p>
            </div>
       
          </div>
        );
      })}
              ₹{(items.productId?.price?.amount || 0) * items.quantity}

     <button className="check-out-btn" onClick={() => navigate("/checkout")}>Check Out</button>

    </aside>
  );

}

