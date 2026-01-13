import { useCart } from "../context/CartContext";
import '../style/product.css'

export default function ProductCard({ product }) {
 const { addToCart } = useCart();


  if (!product) return null;

  return (

    <div className="product-container">
    <div className="product-card">
     
     <div className="product-img">

      <img src={product.images?.[0]?.url} alt={product.title} />
 
         </div>
  
       <div className="product-details">

      <h3 >{product.title}</h3>
      <p>{product.description}</p>
      <p className="price">₹{product.price.amount}</p>
  
       

      <button className="addToCart"  onClick={() => (addToCart(product))}>
         Add to Cart
     </button>
     </div>
    </div>
    </div>

  );
}


// import { useCart } from "../context/CartContext";

// export default function ProductCard({ product }) {
//   const { addToCart } = useCart();

//   return (
//     <div className="product-card">
//       <img src={product.images?.[0]?.url} alt={product.title} />
//       <h3>{product.title}</h3>
//       <p>₹{product.price.amount}</p>

//       <button onClick={() => addToCart(product)}>
//         Add to Cart
//       </button>
//     </div>
//   );
// }

