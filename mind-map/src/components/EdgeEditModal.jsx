import React, { useState, useEffect } from 'react';

const EdgeEditModal = ({ edge, isOpen, onClose, onSave, onDelete }) => {
  const [annotation, setAnnotation] = useState('');

  useEffect(() => {
    if (edge) {
      setAnnotation(edge.data?.annotation || '');
    }
  }, [edge]);

  if (!isOpen || !edge) return null;

  const handleSave = () => {
    const updatedEdge = {
      ...edge,
      data: {
        ...edge.data,
        annotation: annotation.slice(0, 150),
      },
    };
    onSave(updatedEdge);
    onClose();
  };

  const handleDelete = () => {
    onDelete(edge.id);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Edit Connection Annotation</h2>

        <textarea
          value={annotation}
          onChange={(e) => setAnnotation(e.target.value)}
          maxLength={30}
          rows={4}
          placeholder="Add a short note about this connection (max 30 characters)"
          style={{ ...styles.input, resize: 'none' }}
        />
        <div style={styles.charCounter}>{annotation.length}/30 characters</div>

        <div style={styles.buttonRow}>
          <button onClick={handleDelete} style={styles.deleteButton}>
            Delete Connection
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
    maxWidth: '400px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    margin: 0,
    fontSize: '1.4rem',
    textAlign: 'center',
    color: '#333',
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
    marginTop: '-0.5rem',
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

export default EdgeEditModal;
