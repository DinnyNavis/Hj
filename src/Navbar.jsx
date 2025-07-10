import React, { useState, useEffect, useRef } from 'react';

const Navbar = ({ onNavigate, currentPage }) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileRef = useRef(null); // Create a ref for the profile container

  // Effect to handle clicks outside the profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };
    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  // Effect to handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navClasses = [
    'navbar',
    'navbar-expand-lg',
    'py-3',
    'navbar-fixed-top',
    (scrolled || ['myGarden', 'diagnosePage', 'auth'].includes(currentPage)) && 'scrolled',
    (['myGarden', 'diagnosePage', 'auth'].includes(currentPage)) && 'no-blur',
  ].filter(Boolean).join(' ');

  const NavLink = ({ page, children }) => (
    <a
      href={`#${page}`}
      className={`nav-link ${currentPage === page ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(page);
      }}
      style={{
        fontSize: '1.1rem',
        fontWeight: 500,
        color: '#222',
      }}
    >
      {children}
    </a>
  );

  return (
    <nav className={navClasses}>
      <div className="container">
        <a
          className="navbar-brand p-0 border-0"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('home');
          }}
        >
          <img src="logo1.png" alt="Growlify Logo" style={{ height: '80px', width: 'auto' }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav navbar-nav-center">
            <li className="nav-item"><NavLink page="home">Home</NavLink></li>
            <li className="nav-item"><NavLink page="featuresPage">Features</NavLink></li>
            <li className="nav-item"><NavLink page="aboutUs">About Us</NavLink></li>
            <li className="nav-item"><NavLink page="myGarden">My Garden</NavLink></li>
            <li className="nav-item"><NavLink page="contactPage">Contact</NavLink></li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item profile-icon-container" ref={profileRef}>
              <button
                className="nav-link"
                aria-label="Profile menu"
                onClick={() => setShowProfileDropdown(prev => !prev)}
              >
                <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
              </button>
              {showProfileDropdown && (
                <div className="profile-dropdown">
                  <div className="dropdown-title">My Account</div>
                  <button className="dropdown-item" onClick={() => onNavigate('profilePage')}>Profile</button>
                  <button className="dropdown-item" onClick={() => onNavigate('auth')}>Login / Sign Up</button>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('currentUser');
                      localStorage.removeItem('signupCity');
                      onNavigate('home');
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
