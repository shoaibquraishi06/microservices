
import React, { useState } from "react";
import logo from '../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import nikeshoes2 from '../assets/nikeShoes2.avif';
import nikeshoes3 from '../assets/nikeshoes3.avif';
import nikeshoes4 from '../assets/nikeshoes4.avif';
import nikeshoes5 from '../assets/nikeshoes5.avif';
import { CiDeliveryTruck } from "react-icons/ci";
import { IoIosArrowRoundBack } from "react-icons/io";
// import products from "../data/products";
import { useParams } from 'react-router-dom';
import "../style/cart.css";

const product = {
  brand: "NIKE",
  name: "AIR JORDAN 1",
  price: 199.0,
  rating: 4.5,
  reviews: 42,

  colorOptions: [
    { name: "White", img: nikeshoes2 },
    { name: "Grey", img: nikeshoes3 },
    { name: "Black", img: nikeshoes4 },
  ],

  sizes: [40,41, 42, 43, 44, 45],

  images: [
    nikeshoes2,
    nikeshoes3,
    nikeshoes4,
    nikeshoes5,
  ],
};


const Addtocart = () => {
	const [selectedColor, setSelectedColor] = useState(product.colorOptions[0]);
	const [selectedSize, setSelectedSize] = useState(null);
	const [mainImage, setMainImage] = useState(product.images[0]);
	const [added, setAdded] = useState(false);

  
	const navigate = useNavigate();

  const goBack = () =>{
  navigate(-1)
}


	const handleAddToCart = () => {
		setAdded(true);
		setTimeout(() => setAdded(false), 1500);
	};

	return (
		<div className="addtocart-container">
 
            <span className="back-btn" onClick={goBack} ><IoIosArrowRoundBack /></span>

			<div className="addtocart-gallery">
				
				<img className="main-image" src={mainImage} alt="Product" />
				<div className="thumbnail-row">
					{product.images.slice(0, 4).map((img, idx) => (
						<img
							key={idx}
							src={img}
							alt="thumb"
							className={`thumbnail ${mainImage === img ? "active" : ""}`}
							onClick={() => setMainImage(img)}
						/>
					))}
					
				</div>
			</div>
			<div className="addtocart-details">
				<div className="brand-row">
					{/* <span className="brand-logo"><img src={logo} alt=""  /></span> */}
					<span className="brand-name">{product.brand}</span>
				</div>
				<h2 className="product-title">{product.name}</h2>
				<p className="product-para">BasketBall Shoes</p>

				{/* <div className="rating-row">
					<span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
					<span className="reviews">{product.reviews} reviews</span>
				</div> */}
				<div className="price-row">${product.price.toFixed(2)}</div>
				<div className="color-row">
					<span className="color">Color</span>
					<div className="color-options">
						{product.colorOptions.map((color, idx) => (
							<img
								key={color.name}
								src={color.img}
								alt={color.name}
								className={`color-thumb ${selectedColor.name === color.name ? "selected" : ""}`}
								onClick={() => {
									setSelectedColor(color);
									setMainImage(color.img);
								}}
							/>
						))}
					</div>
				</div>
				<div className="size-row">
					<span>Size</span>
					<div className="size-options">
						{product.sizes.map((size) => (
							<button
								key={size}
								className={`size-btn ${selectedSize === size ? "selected" : ""}`}
								onClick={() => setSelectedSize(size)}
							>
								{size}
							</button>
						))}
					</div>
					{/* <span className="size-guide">Size guide</span> */}
				</div>
				<button
					className="add-to-cart-btn"
					disabled={!selectedSize}
					onClick={handleAddToCart}
				>
					{added ? "Added!" : "Add to cart"}
				</button>
				<div className="delivery-info">
					<span className="delivery-icon"> <CiDeliveryTruck />  </span> Free delivery on orders 
				</div>
			</div>
		</div>
	);
};

export default Addtocart;
