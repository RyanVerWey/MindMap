import React from 'react';
import axios from 'axios';

const SaveLoadButtons = ({ setNodes, setEdges }) => {
  const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  };

  const buttonStyles = {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#2196f3',
    color: '#fff',
    cursor: 'pointer',
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:5000/api/mindmaps', {
        title: 'My Map',
        description: 'Saved from frontend',
      });
      alert('Map saved!');
    } catch (err) {
      console.error(err);
      alert('Failed to save map.');
    }
  };

  const handleLoad = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/mindmaps');
      console.log('Loaded maps:', res.data);
      alert('Check console for loaded maps.');
    } catch (err) {
      console.error(err);
      alert('Failed to load maps.');
    }
  };

  const handleClear = () => {
    setNodes([]);
    setEdges([]);
  };

  return (
    <div style={buttonContainerStyles}>
      <button style={buttonStyles} onClick={handleSave}>Save Map</button>
      <button style={buttonStyles} onClick={handleLoad}>Load Map</button>
      <button
        style={{ ...buttonStyles, backgroundColor: '#f44336' }}
        onClick={handleClear}
      >
        Clear Canvas
      </button>
    </div>
  );
};

export default SaveLoadButtons;
