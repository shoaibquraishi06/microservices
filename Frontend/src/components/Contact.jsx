
import React, { useState } from 'react';
import { SlPhone } from "react-icons/sl";
import { TfiEmail } from "react-icons/tfi";
import { IoLocationOutline } from "react-icons/io5";
import '../style/contact.css';

export default function Contact() {
	const [form, setForm] = useState({
		name: '',
		email: '',
		topic: '',
		message: ''
	});
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
		// You can add your form submission logic here
	};

	return (
		<div className="contact-main-container">
			<div className="contact-header">
				{/* <div className="contact-icon">
					<svg height="48" width="48" viewBox="0 0 48 48"><path d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm-2-24h4v4h-4zm0 6h4v12h-4z"/></svg>
				</div> */}
				<h1>Get in Touch</h1>
				<p>We'd love to hear from you. Please fill out this form.</p>
			</div>
			<div className="contact-content">
				<form className="contact-form" onSubmit={handleSubmit}>
					<div className="contact-row">
						<div className="contact-field">
							<label htmlFor="name">NAME</label>
							<input
								type="text"
								id="name"
								name="name"
								placeholder="Full Name"
								value={form.name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="contact-field">
							<label htmlFor="email">EMAIL</label>
							<input
								type="email"
								id="email"
								name="email"
								placeholder="Email"
								value={form.email}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
					<div className="contact-row">
						<div className="contact-field" style={{ width: '100%' }}>
							<label htmlFor="topic">TOPIC</label>
							<select
								id="topic"
								name="topic"
								value={form.topic}
								onChange={handleChange}
								required
							>
								<option value="">Select a topic</option>
								<option value="order">Order</option>
								<option value="product">Product</option>
								<option value="support">Support</option>
								<option value="other">Other</option>
							</select>
						</div>
					</div>
					<div className="contact-row">
						<div className="contact-field" style={{ width: '100%' }}>
							<label htmlFor="message">MESSAGE</label>
							<textarea
								id="message"
								name="message"
								placeholder="How can we help?"
								value={form.message}
								onChange={handleChange}
								required
								rows={5}
							/>
						</div>
					</div>
					<button type="submit" className="contact-submit-btn">Send Message</button>
					<div className="contact-policy">
						By sending this message, you agree to our <a href="#"><span className='policy'>Privacy Policy</span></a>.
					</div>
					{submitted && <div className="contact-success">Thank you for contacting us!</div>}
				</form>
				<div className="contact-info">
					<h3>CONTACT INFORMATION</h3>
					<div className="contact-info-item">
						<span className="contact-info-icon"><SlPhone/></span>
						<div>
							<strong>Phone</strong><br />
							<span className='con-gap'> Mon–Fri, 9am – 6pm IST </span> <br />
							<p>+91 8420680130</p>
						</div>
					</div>
					<div className="contact-info-item">
						<span className="contact-info-icon"><TfiEmail/></span>
						<div>
							<strong>Email</strong><br />
						<span className='con-gap'>	Our team will reply in 24h </span> <br />
							<p>dxshoaib51@gmail.com</p>
						</div>
					</div>
					<div className="contact-info-item">
						<span className="contact-info-icon"><IoLocationOutline/></span>
						<div>
							<strong>Inida</strong><br />
							<span className='con-gap'> UP, Lucknow </span><br />
							Raebareli 229307
						</div>
					</div>
					{/* <div className="contact-map">
						<img src="https://maps.googleapis.com/maps/api/staticmap?center=One+Bowerman+Dr,Beaverton,OR&zoom=13&size=300x100&key=YOUR_API_KEY" alt="Map" style={{ width: '100%', borderRadius: '8px' }} />
					</div> */}
				</div>
			</div>
		</div>
	);
}
