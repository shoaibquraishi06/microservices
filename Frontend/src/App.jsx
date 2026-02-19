//  -----pages
import Navber from './components/Navber';
import Home from './components/heroSection';
import Products from './pages/Products';
import Footer from './components/Footer';
import Contact from './components/Contact';

//  -----auth pages
import Login from './pages/Login';
import Register from './pages/Register';
import ProductGrid from './components/ProductGrid';
import ProductctDetails from './components/ProductDetail';




//  -----components and context

// import { CartProvider } from "./context/CartContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import Wishlist  from './components/Whishlist';
import ProductDetails from './components/ProductDetail';
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import CartDrawer from "./components/Cart";
import Account from "./pages/Account";
import Checkout from './components/Checkout';
import Payment from './components/Payment';



// -----routing

import MainRoutes from './routes/MainRoutes';
import { Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  // const [open, setOpen] = useState(false);
  
  



  return (
    <>

  

  
  


    
    {/* <ProductGrid/> */}

           <CartProvider>
      {/* <Products /> */}
       {/* <CartDrawer
        isOpen={open}
        onClose={() => setOpen(false)}
      /> */}
    </CartProvider>
    
        
      <Navber />
      <Routes>
        <Route path="/" element={<MainRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<CartDrawer />} />

         <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
         <Route path="/products/:id" element={<ProductDetails />} />
      


        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
        
      <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/footer" element={<Footer />} />
      
        
        {/* Add more routes as needed */}
        <Route path="*" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>404 - Page Not Found</h2></div>} />
      </Routes>
    </>
  );
}

export default App;
