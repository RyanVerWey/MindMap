import React from 'react';
import axios from 'axios';

const SaveLoadButtons = ({ setNodes, setEdges }) => {
  const buttonContainerStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: 'var(--spacing-md)',
    marginBottom: 'var(--spacing-md)',
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
      <button className="action-button" onClick={handleSave}>
        Save Map
      </button>
      <button className="action-button" onClick={handleLoad}>
        Load Map
      </button>
      <button className="action-button danger" onClick={handleClear}>
        Clear Canvas
      </button>
    </div>
  );
};

export default SaveLoadButtons;
