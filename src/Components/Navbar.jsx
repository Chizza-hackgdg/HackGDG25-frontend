// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; // Assuming your existing Navbar.css
import { FaHome, FaCreditCard, FaThLarge } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSectionId, setActiveSectionId] = useState('');
  const navbarRef = useRef(null); // Ref to get navbar height

  const handleScrollLinkClick = (hash) => {
    if (location.pathname !== '/') {
      navigate('/' + hash);
    } else {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        if (window.location.hash !== hash) {
          window.history.pushState(null, '', hash);
        }
      }
    }
  };

  const handleHomeLinkClick = (e) => {
    if (location.pathname === '/') {
      // Only preventDefault if we are truly just scrolling,
      // not if NavLink needs to clear a hash state by navigating to "/"
      if (window.scrollY === 0 && location.hash === '') {
        e.preventDefault();
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (location.hash !== '') {
        // NavLink to "/" should handle clearing hash, but explicit can help
        navigate("/", { replace: true });
      }
      setActiveSectionId(''); // Explicitly set home as active context
    }
    // If on a different page, NavLink to="/" handles navigation
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['skills', 'subscriptions']; // Order matters for some logic, ensure DOM order
      const navbarHeight = navbarRef.current?.offsetHeight || 70;
      const scrollY = window.scrollY;
      let newActiveId = '';

      // Iterate from bottom-most section defined in sectionIds upwards in the DOM
      // This logic finds the section whose top is currently above or at the "activation line"
      // (navbarHeight + a small buffer). The highest one on the page wins.
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          // element.offsetTop is distance from top of document
          // We want to activate it when its top passes under the navbar
          if (element.offsetTop <= scrollY + navbarHeight + 20) { // Add a 20px buffer
            newActiveId = id;
            break; // Found the highest section that's "active"
          }
        }
      }
      setActiveSectionId(newActiveId);
    };

    if (location.pathname === '/') {
      const initialCheck = () => {
        if (location.hash) {
          const element = document.getElementById(location.hash.substring(1));
          if (element) {
            // Wait for potential browser scroll then check
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth' });
              handleScroll();
            }, 100);
          } else {
            handleScroll(); // Hash exists but no element, run scroll check anyway
          }
        } else {
          // No hash, ensure we are at the top for homepage
          window.scrollTo({ top: 0, behavior: 'auto' });
          handleScroll();
        }
      };
      initialCheck();

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    } else {
      setActiveSectionId('');
    }
  }, [location.pathname, location.hash, navigate]); // Added navigate to dependencies

  return (
    <nav className="app-navbar" ref={navbarRef}>
      <div className="navbar-logo">
        <Link to="/">ICHU</Link>
      </div>
      <div className="navbar-links">
        <NavLink
          to="/"
          className={({isActive}) => 
            (isActive && location.hash === '' && activeSectionId === '') ? "nav-link active" : "nav-link"
          }
          onClick={handleHomeLinkClick}
          end
        >
          <FaHome className="nav-icon" /> Home
        </NavLink>

        <Link
          to="/#skills"
          className={`nav-link ${activeSectionId === 'skills' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); handleScrollLinkClick('#skills'); }}
        >
          <FaThLarge className="nav-icon" /> Skills
        </Link>

        <Link
          to="/#subscriptions"
          className={`nav-link ${activeSectionId === 'subscriptions' ? 'active' : ''}`}
          onClick={(e) => { e.preventDefault(); handleScrollLinkClick('#subscriptions'); }}
        >
          <FaCreditCard className="nav-icon" /> Subscription
        </Link>
        
        <NavLink 
          to="/register" 
          className={({isActive}) => isActive ? "nav-link auth-link active" : "nav-link auth-link"}
        >
          Register
        </NavLink>
        <NavLink 
          to="/login" 
          className={({isActive}) => isActive ? "nav-link auth-link active" : "nav-link auth-link"}
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
