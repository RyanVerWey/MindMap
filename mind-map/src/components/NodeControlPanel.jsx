import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import api from '../api';

const NodeControlPanel = ({ nodes, edges, setNodes, setEdges }) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState('');
  const [nodeType, setNodeType] = useState('process');
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(100);

  const [mapName, setMapName] = useState('');
  const [savedMaps, setSavedMaps] = useState([]);
  const [selectedMap, setSelectedMap] = useState('');

  useEffect(() => {
    loadSavedMaps();
  }, []);

  const loadSavedMaps = async () => {
    try {
      const res = await api.get('/maps');
      setSavedMaps(res.data.maps || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load saved maps.');
    }
  };

  const handleAddNode = () => {
    if (!label.trim()) {
      alert('Please enter a node label.');
      return;
    }

    const newId = nanoid();
    const newNode = {
      id: newId,
      type: nodeType,
      data: {
        label,
        description: description.trim().slice(0, 300),
        width: Math.min(Math.max(parseInt(width) || 150, 100), 600),
        height: Math.min(Math.max(parseInt(height) || 100, 50), 600),
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
      }
    }

    setLabel('');
    setDescription('');
    setParentId('');
    setWidth(150);
    setHeight(100);
  };

  const handleSaveMapWithName = async () => {
    if (!mapName.trim()) {
      alert('Please enter a map name.');
      return;
    }

    try {
      await api.post('/map', { name: mapName, nodes, edges });
      alert(`Map "${mapName}" saved to server.`);
      loadSavedMaps();
    } catch (err) {
      console.error(err);
      alert('Failed to save map.');
    }
  };

  const handleLoadMapByName = async (selectedName) => {
    if (!selectedName) return;
    try {
      const res = await api.get(`/map/${selectedName}`);
      setNodes(res.data.nodes || []);
      setEdges(res.data.edges || []);
      alert(`Loaded map "${selectedName}".`);
    } catch (err) {
      console.error(err);
      alert('Failed to load map.');
    }
  };

  const handleDeleteMapByName = async () => {
    if (!selectedMap) {
      alert('Please select a map to delete.');
      return;
    }
    if (!window.confirm(`Are you sure you want to delete map "${selectedMap}"?`)) {
      return;
    }

    try {
      await api.delete(`/map/${selectedMap}`);
      alert(`Deleted map "${selectedMap}".`);
      loadSavedMaps();
      setSelectedMap('');
      setNodes([]);
      setEdges([]);
    } catch (err) {
      console.error(err);
      alert('Failed to delete map.');
    }
  };

  const handleLoadTemplate = async (templateName) => {
    try {
      const res = await api.get(`/template/${templateName}`);
      setNodes(res.data.nodes || []);
      setEdges(res.data.edges || []);
      alert(`Template "${templateName}" loaded.`);
    } catch (err) {
      console.error(err);
      alert(`Failed to load template "${templateName}".`);
    }
  };

  const styles = {
    panel: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      width: '100%',
      maxWidth: '480px',
      padding: '1.5rem',
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      fontFamily: 'Segoe UI, sans-serif',
      color: '#333',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      borderBottom: '1px solid #eee',
      paddingBottom: '1rem',
    },
    sectionTitle: {
      fontSize: '1.1rem',
      fontWeight: '600',
      marginBottom: '0.25rem',
    },
    input: {
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '0.9rem',
    },
    button: {
      padding: '0.6rem',
      borderRadius: '6px',
      backgroundColor: '#3b82f6',
      color: '#fff',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    deleteButton: {
      padding: '0.6rem',
      borderRadius: '6px',
      backgroundColor: '#e53935',
      color: '#fff',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
    },
    dropdown: {
      padding: '0.5rem 0.75rem',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '0.9rem',
    },
  };

  return (
    <div style={styles.panel}>
      {/* New Node Controls */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>New Node Controls</div>
        <input style={styles.input} value={label} placeholder="Node title" onChange={(e) => setLabel(e.target.value)} />
        <textarea style={styles.input} value={description} placeholder="Node description" onChange={(e) => setDescription(e.target.value)} />
        <input style={styles.input} value={parentId} placeholder="Parent node ID (optional)" onChange={(e) => setParentId(e.target.value)} />
        <select style={styles.dropdown} value={nodeType} onChange={(e) => setNodeType(e.target.value)}>
          <option value="process">Process Node</option>
          <option value="workflow">Workflow Node</option>
          <option value="user">User Node</option>
          <option value="dimensions">Dimensions Node</option>
        </select>
        <input style={styles.input} type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Width" />
        <input style={styles.input} type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" />
        <button style={styles.button} onClick={handleAddNode}>Add Node</button>
      </div>

      {/* Project Templates */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Project Templates</div>
        <button style={styles.button} onClick={() => handleLoadTemplate('frontend-workflow')}>Load Frontend Workflow</button>
        <button style={styles.button} onClick={() => handleLoadTemplate('bug-fix-workflow')}>Load Bug Fix Workflow</button>
      </div>

      {/* Map Save / Load Controls */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Map Save / Load</div>
        <input style={styles.input} value={mapName} placeholder="Map name" onChange={(e) => setMapName(e.target.value)} />
        <button style={styles.button} onClick={handleSaveMapWithName}>Save Map as "{mapName || 'Untitled'}"</button>
        <select
          style={styles.dropdown}
          value={selectedMap}
          onChange={(e) => setSelectedMap(e.target.value)}
        >
          <option value="">Select saved map</option>
          {savedMaps.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <button style={styles.button} onClick={() => handleLoadMapByName(selectedMap)}>Load Selected Map</button>
        <button style={styles.deleteButton} onClick={handleDeleteMapByName}>Delete Selected Map</button>
      </div>
    </div>
  );
};

export default NodeControlPanel;
