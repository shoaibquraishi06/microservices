import HeroSection from "../components/heroSection";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ProductGrid from "../components/ProductGrid";
import ChatAssistant from "../components/ChatAssistant";
import Clouser from '../components/HerosectionClourser/MorphSlider';
import CategorySection  from "../components/CategorySection";
import FAQ from "../components/FAQ"

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../feature/productThunk";

const MainRoutes = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      
      <HeroSection />
      <ChatAssistant />
      <CategorySection/>
      {/* <Payment2/> */}
      <ProductGrid product={Array.isArray(items) ? items : []} />
      <FAQ/>
      <Contact />
      <Footer />
    </div>
  );
};

export default MainRoutes;