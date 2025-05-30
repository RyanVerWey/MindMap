import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const headerStyles = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    width: '100%', 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1f2937',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    color: '#fff',
  };

  const navStyles = {
    display: 'flex',
    gap: '1.5rem',
  };

  const linkStyles = (isActive) => ({
    color: isActive ? '#4caf50' : '#e5e7eb', 
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: isActive ? 'bold' : '500',
    padding: '0.5rem 0',
    borderBottom: isActive ? '2px solid #4caf50' : '2px solid transparent',
    transition: 'color 0.3s, border-bottom 0.3s',
  });

  const linkHoverStyles = {
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  };

  return (
    <header style={headerStyles}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        🧠 Mind Map
      </div>
      <nav style={navStyles}>
        <Link to="/" style={{ ...linkStyles(location.pathname === '/'), ...linkHoverStyles }}>
          Home
        </Link>
        <Link to="/project" style={{ ...linkStyles(location.pathname === '/project'), ...linkHoverStyles }}>
          Project
        </Link>
        <Link to="/settings" style={{ ...linkStyles(location.pathname === '/settings'), ...linkHoverStyles }}>
          Settings
        </Link>
      </nav>
    </header>
  );
};

export default Header;
