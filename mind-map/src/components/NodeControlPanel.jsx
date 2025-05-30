import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { toPng } from 'html-to-image';

const NodeControlPanel = ({ nodes, setNodes, setEdges, canvasRef }) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState('');
  const [nodeType, setNodeType] = useState('process');
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(100);

  const handleAddNode = () => {
    if (!label.trim()) {
      alert('Please enter a node label.');
      return;
    }

    const trimmedDescription = description.trim().slice(0, 300);
    const clampedWidth = Math.min(Math.max(parseInt(width) || 150, 100), 600);
    const clampedHeight = Math.min(Math.max(parseInt(height) || 100, 50), 600);
    const newId = nanoid();

    const newNode = {
      id: newId,
      type: nodeType,
      data: {
        label,
        description: trimmedDescription,
        width: clampedWidth,
        height: clampedHeight,
      },
      position: { x: Math.random() * 400, y: Math.random() * 400 },
    };

    setNodes((prev) => [...prev, newNode]);

    if (parentId) {
      const parentExists = nodes.find((n) => n.id === parentId);
      if (parentExists) {
        const newEdge = {
          id: `edge-${parentId}-${newId}`,
          source: parentId,
          target: newId,
        };
        setEdges((prev) => [...prev, newEdge]);
      } else {
        alert(`Parent ID "${parentId}" not found. Node added without connection.`);
      }
    }

    setLabel('');
    setDescription('');
    setParentId('');
    setWidth(150);
    setHeight(100);
  };

  const handleExportPng = () => {
    if (canvasRef && canvasRef.current) {
      toPng(canvasRef.current, { backgroundColor: 'transparent' })
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.download = 'mindmap-export.png';
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error('Export failed:', err);
          alert('Failed to export image.');
        });
    } else {
      alert('Could not find the canvas to export.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
        width: '100%',
        maxWidth: '500px',
        boxSizing: 'border-box',
        margin: '0 auto',
        padding: 'var(--spacing-md)',
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: 'var(--spacing-sm)' }}>
        Add New Node
      </h3>

      <input
        className="node-input"
        type="text"
        value={label}
        placeholder="Node title (required)"
        onChange={(e) => setLabel(e.target.value)}
      />

      <textarea
        className="node-input"
        value={description}
        placeholder="Node description (max 300 characters)"
        maxLength={300}
        rows={3}
        onChange={(e) => setDescription(e.target.value)}
        style={{ resize: 'none' }}
      />
      <div
        style={{
          fontSize: '0.75rem',
          textAlign: 'right',
          color: 'var(--color-text-secondary)',
        }}
      >
        {description.length}/300 characters
      </div>

      <input
        className="node-input"
        type="text"
        value={parentId}
        placeholder="Optional parent node ID"
        onChange={(e) => setParentId(e.target.value)}
      />

      <select
        className="node-input"
        value={nodeType}
        onChange={(e) => setNodeType(e.target.value)}
      >
        <option value="process">Process Node</option>
        <option value="workflow">Workflow Node</option>
        <option value="user">User Node</option>
        <option value="dimensions">Dimensions Node</option>
      </select>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
        <div>
          <label
            style={{
              fontSize: '0.75rem',
              marginBottom: '0.25rem',
              display: 'block',
              color: 'var(--color-text-secondary)',
            }}
          >
            Width (px)
          </label>
          <input
            className="node-input"
            type="number"
            value={width}
            min={100}
            max={600}
            onChange={(e) => setWidth(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label
            style={{
              fontSize: '0.75rem',
              marginBottom: '0.25rem',
              display: 'block',
              color: 'var(--color-text-secondary)',
            }}
          >
            Height (px)
          </label>
          <input
            className="node-input"
            type="number"
            value={height}
            min={50}
            max={600}
            onChange={(e) => setHeight(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
      </div>

      <button
        className="node-button"
        onClick={handleAddNode}
        style={{
          padding: 'var(--spacing-sm)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-primary)',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        ➕ Add Node
      </button>

      <button
        onClick={handleExportPng}
        style={{
          padding: '0.5rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: '#4caf50',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
      >
        📸 Export as PNG
      </button>
    </div>
  );
};

export default NodeControlPanel;
