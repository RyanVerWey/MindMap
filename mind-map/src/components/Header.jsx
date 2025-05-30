import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const headerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: '#fff',
    borderBottom: '2px solid #4caf50',
  };

  const navStyles = {
    display: 'flex',
    gap: '1rem',
  };

  const linkStyles = (isActive) => ({
    color: isActive ? '#4caf50' : '#fff',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    borderBottom: isActive ? '2px solid #4caf50' : 'none',
    paddingBottom: '2px',
  });

  return (
    <header style={headerStyles}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>🧠 Mind Map</h1>
      </div>
      <nav style={navStyles}>
        <Link to="/" style={linkStyles(location.pathname === '/')}>Home</Link>
        <Link to="/project" style={linkStyles(location.pathname === '/project')}>Project</Link>
        <Link to="/settings" style={linkStyles(location.pathname === '/settings')}>Settings</Link>
      </nav>
    </header>
  );
};

export default Header;
