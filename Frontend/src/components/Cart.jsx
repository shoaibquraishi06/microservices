import { useSelector } from "react-redux";
import  {useNavigate } from "react-router-dom";
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
        <p>Cart is empty</p>
        </div>
     
       <button className="cart-btn" onClick={productPageHandler} >
               Shoping now
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
              <h4>{item.productId.title}</h4>
              <p>₹{product.price?.amount}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          </div>
        );
      })}

     <button className="check-out-btn" onClick={() => navigate("/checkout")}>Check Out</button>

    </aside>
  );

}

