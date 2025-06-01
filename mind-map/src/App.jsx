import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Project from './pages/Project';

const App = () => {
  const appStyles = {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f3f4f6', 
  };

  const contentStyles = {
    flex: 1, 
    width: '100%',
    overflow: 'auto', 
  };

  return (
    <Router>
      <div style={appStyles}>
        <Header />
        <div style={contentStyles}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
