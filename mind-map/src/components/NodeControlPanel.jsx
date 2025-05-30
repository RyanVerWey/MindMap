import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const NodeControlPanel = ({ setNodes }) => {
  const [label, setLabel] = useState('');

  const panelStyles = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1rem',
  };

  const inputStyles = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minWidth: '200px',
  };

  const buttonStyles = {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#4caf50',
    color: '#fff',
    cursor: 'pointer',
  };

  const handleAddNode = () => {
    if (!label.trim()) return;

    setNodes((prev) => [
      ...prev,
      {
        id: nanoid(),
        data: { label },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
      },
    ]);
    setLabel('');
  };

  return (
    <div style={panelStyles}>
      <input
        style={inputStyles}
        type="text"
        value={label}
        placeholder="Node label"
        onChange={(e) => setLabel(e.target.value)}
      />
      <button style={buttonStyles} onClick={handleAddNode}>Add Node</button>
    </div>
  );
};

export default NodeControlPanel;
