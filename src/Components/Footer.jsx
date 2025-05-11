// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FaGithub } from 'react-icons/fa'; // Example social icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="app-footer">
      <div className="footer-content">
        <div className="footer-logo-section">
          <Link to="/" className="footer-logo">ICHU</Link>
          <p className="footer-tagline">Unlock Your Potential.</p>
        </div>
        <div className="footer-links-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/#skills">Skills</Link></li>
            <li><Link to="/#subscriptions">Subscriptions</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            {/* Add more links like Privacy Policy, Terms of Service if needed */}
            {/* <li><Link to="/privacy-policy">Privacy Policy</Link></li> */}
            {/* <li><Link to="/terms-of-service">Terms of Service</Link></li> */}
          </ul>
        </div>
        <div className="footer-social-section">
          <h4>Connect With Us</h4>
          <div className="social-icons">
            <a href="https://github.com/chizza-hackgdg" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} ICHU. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
