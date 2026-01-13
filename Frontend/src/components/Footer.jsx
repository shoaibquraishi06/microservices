
import React from "react";
import Logo from '../assets/whitelogo.jpg'
import "../style/footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-logo-section">
					<img
						src={Logo}
						alt="Nike Logo"
						className="footer-logo"
					/>
					<div className="footer-copyright">
						© 2025 NIKE
						<br />
						All Rights Reserved
					</div>
				</div>
				<div className="footer-links-section">
					<div className="footer-links-group">
						<h4>Info</h4>
						<ul>
							<li>Find a store</li>
							<li>Discount</li>
							<li>Gift</li>
							<li>Feedback</li>
							<li>Become a member</li>
						</ul>
					</div>
					<div className="footer-links-group">
						<h4>Shop</h4>
						<ul>
							<li>Man</li>
							<li>Woman</li>
							<li>Kids</li>
							<li>Collections</li>
							<li>Contacts</li>
						</ul>
					</div>
					<div className="footer-links-group">
						<h4>About</h4>
						<ul>
							<li>News</li>
							<li>Careers</li>
						</ul>
					</div>
				</div>
				<div className="footer-social-section">
					<div className="footer-social-icons">
						<a href="#" aria-label="Twitter" className="footer-social-icon">
							<i className="fab fa-twitter"></i>
						</a>
						<a href="#" aria-label="Facebook" className="footer-social-icon">
							<i className="fab fa-facebook-f"></i>
						</a>
						<a href="#" aria-label="Instagram" className="footer-social-icon">
							<i className="fab fa-instagram"></i>
						</a>
						<a href="#" aria-label="YouTube" className="footer-social-icon">
							<i className="fab fa-youtube"></i>
						</a>
					</div>
					<div className="footer-policy">
						<a href="#">Privacy &amp; Cookie Policy</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
