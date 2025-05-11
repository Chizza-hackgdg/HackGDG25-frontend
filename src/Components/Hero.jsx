import React from "react";
import { Link } from 'react-router-dom'; // Import Link
import "../styles/Hero.css";
import ScrollArrow from "./ScrollArrow.jsx";
// Placeholder images - replace with your actual images
//import workOutImg from '../assets/workout.jpg'; // Create an assets folder in src
//import codingImg from '../assets/coding.jpg';
//import dietImg from '../assets/diet.jpg';

const Hero = () => {
	return (
		<main id="home">
			<div className="hero-content">
				<div className="hero-left">
					<h1>I Could Help Us</h1>
					<p className="subtitle">Discover your potential</p>
					<div className="hero-buttons">
						<Link to="/register" className="btn btn-primary">Register</Link> {/* Changed button to Link */}
            <Link to="/login" className="btn btn-secondary">Login</Link> {/* Assuming you'll have a /login route */}
					</div>
				</div>
				<div className="hero-right">
					<p className="ai-training-text">AI POWERED PERSONAL TRAINING</p>
					<div className="training-cards">
						<div className="card">
							<div className="card-label">Work Out</div>
						</div>
						<div className="card">
							<div className="card-label">Coding</div>
						</div>
						<div className="card">
							<div className="card-label">Healthy Diet</div>
						</div>
					</div>
					<p className="tailored-text">TAILORED FOR YOUR NEEDS</p>
				</div>
			</div>
		        <ScrollArrow />
		</main>
	);
};

export default Hero;
/*
export default function Hero() {
	return (
		<section className="hero">
			<div id="TitleWrapper">
				<div id="Title">
					<span className="title-text bold">I Could </span>
					<span className="title-text">Help Us</span>
				</div>
				<span className="subtitle-text">Discover your potential</span>
			</div>
			<div id="HeroButtonWrapper">
				<button id="HeroRegister">Register</button>
				<button id="HeroLogin">Login</button>
			</div>
		</section>
	);
}
*/

