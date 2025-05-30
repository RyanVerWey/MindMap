import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Project from './pages/Project';

const App = () => {
  const appStyles = { fontFamily: 'Arial, sans-serif', minHeight: '100vh', margin: 0, padding: '1rem' };

  const navStyles = {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
    padding: '0.5rem 0',
    borderBottom: '1px solid #ccc',
  };

  return (
    <Router>
      <div style={appStyles}>
        <nav style={navStyles}>
          <Link to="/">Home</Link>
          <Link to="/project">Mind Map</Link>
          <Link to="/settings">Settings</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
