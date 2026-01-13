import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeroSection from '../components/heroSection';
import Products from '../pages/Products';
import Contact from '../components/Contact';
import Footer from "../components/Footer";
// Placeholder Order component
const Order = () => <div style={{padding: '2rem', textAlign: 'center'}}><h2>Order Page</h2><p>This is the order page. Implement your order logic here.</p></div>;


const MainRoutes = () => {
  return (
    <>
      <HeroSection />
      <Products />
      <Contact />
      <Footer />
    </>
  );
};

export default MainRoutes;
