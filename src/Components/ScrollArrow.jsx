import React from 'react';
import '../styles/ScrollArrow.css';
import { FaChevronDown } from 'react-icons/fa'; // Using react-icons

const ScrollArrow = () => {
  return (
    <div className="scroll-arrow-container">
      <FaChevronDown className="scroll-arrow-icon" />
      <FaChevronDown className="scroll-arrow-icon second-arrow" />
    </div>
  );
};

export default ScrollArrow;