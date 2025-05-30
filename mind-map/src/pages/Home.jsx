import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const styles = { textAlign: 'center', marginTop: '2rem' };

  return (
    <div style={styles}>
      <h1>🧠 Mind Map Tool</h1>
      <p>Welcome to your personal mind mapping app. Organize your thoughts, link ideas, and explore!</p>
      <Link to="/project">
        <button style={{ padding: '0.75rem 1.5rem', marginTop: '1rem', borderRadius: '4px', background: '#4caf50', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Home;
