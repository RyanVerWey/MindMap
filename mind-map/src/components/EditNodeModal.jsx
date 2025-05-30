import React, { useState, useEffect } from 'react';

const EditNodeModal = ({ node, isOpen, onClose, onSave, onDelete }) => {
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [width, setWidth] = useState(150);
  const [height, setHeight] = useState(100);

  useEffect(() => {
    if (node) {
      setLabel(node.data.label || '');
      setDescription(node.data.description || '');
      setWidth(node.data.width || 150);
      setHeight(node.data.height || 100);
    }
  }, [node]);

  if (!isOpen || !node) return null;

  const handleSave = () => {
    const clampedWidth = Math.min(Math.max(parseInt(width) || 150, 100), 600);
    const clampedHeight = Math.min(Math.max(parseInt(height) || 100, 50), 600);

    const updatedNode = {
      ...node,
      data: {
        ...node.data,
        label,
        description: description.slice(0, 300),
        width: clampedWidth,
        height: clampedHeight,
      },
    };

    onSave(updatedNode);
    onClose();
  };

  const handleDelete = () => {
    onDelete(node.id);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Edit Node</h2>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            value={label}
            placeholder="Node title"
            onChange={(e) => setLabel(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Description (max 300 chars)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={300}
            rows={3}
            style={{ ...styles.input, resize: 'none' }}
          />
          <div style={styles.charCounter}>{description.length}/300 characters</div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Width (px)</label>
          <input
            type="number"
            value={width}
            min={100}
            max={600}
            onChange={(e) => setWidth(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Height (px)</label>
          <input
            type="number"
            value={height}
            min={50}
            max={600}
            onChange={(e) => setHeight(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.buttonRow}>
          <button onClick={handleDelete} style={styles.deleteButton}>
            Delete
          </button>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={onClose} style={styles.cancelButton}>
              Cancel
            </button>
            <button onClick={handleSave} style={styles.saveButton}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    padding: '1rem',
    boxSizing: 'border-box',
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
    textAlign: 'center',
    color: '#333',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '0.85rem',
    marginBottom: '0.25rem',
    color: '#555',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
  },
  charCounter: {
    fontSize: '0.7rem',
    textAlign: 'right',
    color: '#888',
    marginTop: '0.25rem',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
    alignItems: 'center',
  },
  deleteButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default EditNodeModal;
