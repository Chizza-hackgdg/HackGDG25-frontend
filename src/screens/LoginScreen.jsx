// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For the "Register here" link
import '../styles/LoginScreen.css'; // We'll create this CSS file next
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({ email, password, rememberMe });
    alert('Login attempt (check console)!');
    // Example:
    // if (email === "user@example.com" && password === "password") {
    //   // Navigate to dashboard or home page
    //   console.log("Login successful");
    // } else {
    //   alert("Invalid credentials");
    // }
  };

  return (
    <div className="login-screen">
      {/* Decorative Background Texts - similar to RegisterScreen */}
      <span className="bg-text text-invest-login">INVEST IN YOURSELF</span>
      <span className="bg-text text-ichu-login">ICHU</span> {/* Unique text from login screen image */}
      <span className="bg-text text-levelup-login">LEVEL UP</span>
      <span className="bg-text text-startgrowing-login">START GROWING</span>
      <span className="bg-text text-beginjourney-login">BEGIN YOUR JOURNEY</span>

      <div className="login-form-container">
        <h2>Sign in</h2>
        <p className="register-link-text">
          If you don't have an account register <br /> You can{' '}
          <Link to="/register" className="highlight-link">
            Register here !
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="password-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="forgot-password-link"> {/* Add a route for this later if needed */}
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>
        {/* The "or continue with" and OAuth buttons are removed as requested */}
      </div>
    </div>
  );
};

export default LoginScreen;
