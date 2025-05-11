import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For the "Login here" link
import '../styles/RegisterScreen.css';
import { FaEnvelope, FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration logic here
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log({ email, username, password });
    alert('Registration submitted (check console)!');
  };

  return (
    <div className="register-screen">
      {/* Decorative Background Texts */}
      <span className="bg-text text-invest">INVEST IN YOURSELF</span>
      <span className="bg-text text-levelup">LEVEL UP</span>
      <span className="bg-text text-startgrowing">START GROWING</span>
      <span className="bg-text text-beginjourney">BEGIN YOUR JOURNEY</span>

      <div className="register-form-container">
        <h2>Sign up</h2>
        <p className="login-link-text">
          If you already have an account register <br /> You can{' '}
          <Link to="/login" className="highlight-link">
            Login here !
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="register-form">
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
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Enter your User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="btn-register">
            Register
          </button>
        </form>
        <div className="unlock-potential-text">
          <p>AND</p>
          <p>UNLOCK YOUR POTENTIAL</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;