import React from 'react'
import Herologo from '../assets/heroSection.avif';
import  {useNavigate } from "react-router-dom";
import '../style/heroSection.css'

const heroSection = () => {

  const navigate = useNavigate()

   const productPageHandler = (e) => {
    
     navigate("/product");
   
  };

  
  return (
    <div>
      <section className="hero">
      <div className="hero-left">
        <p className="category">Men's Shoe</p>

        <h1 className="title">
          HOLLYWOOD <br /><span>KEEPERS COLLECTION</span>
        </h1>

        <p className="desc">
          HOLLYWOOD KEEPERS COLLECTION celebrates a legendary career with
          classic design lines and detailing for streamlined hoops style.
        </p>

        <button className="cta" onClick={productPageHandler}>Go to collection</button>
      </div>

        <img src={Herologo } className="hero-bg" alt="background" />
        {/* <h1 className="air">AIR</h1> */}
        {/* <img src={Herologo } className="shoe" alt="Jordan shoes" /> */}
        {/* <h1 className="jordan">JORDAN</h1>
        <h2 className="rings">6 RINGS</h2> */}
     
    </section>
    </div>
  )
}

export default heroSection
