import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [hover, setHover] = useState(false);

  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, var(--color-secondary), var(--color-primary))',
    textAlign: 'center',
    padding: 'var(--spacing-lg)',
    color: 'var(--color-background)',
  };

  const buttonStyles = {
    padding: 'var(--spacing-sm) var(--spacing-lg)',
    borderRadius: 'var(--radius-full)',
    background: 'var(--color-primary)',
    color: '#fff',
    border: 'none',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'transform var(--transition-fast), background var(--transition-fast)',
  };

  const buttonHoverStyles = {
    transform: 'scale(1.05)',
    background: 'var(--color-primary-dark)',
  };

  return (
    <div style={pageStyles}>
      <h1 className="home-heading">🧠 Mind Map</h1>
      <p className="home-subheading">
        Welcome to your personal mind mapping app. Organize your thoughts, link ideas, and explore your creativity.
      </p>
      <Link to="/project">
        <button
          style={hover ? { ...buttonStyles, ...buttonHoverStyles } : buttonStyles}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
