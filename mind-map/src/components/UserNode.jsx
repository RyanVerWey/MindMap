import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';

const UserNode = ({ data }) => {
  const width = data.width || 200;
  const height = data.height || 'auto';

  const [showHandles, setShowHandles] = useState(false);

  const handleMouseEnter = () => setShowHandles(true);
  const handleMouseLeave = () => setShowHandles(false);

  const handleStyle = (baseStyle) => ({
    ...baseStyle,
    opacity: showHandles ? 1 : 0,
    transition: 'opacity 0.2s ease',
  });

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: `${width}px`,
        minWidth: '100px',
        maxWidth: '300px',
        height: height === 'auto' ? 'auto' : `${height}px`,
        padding: 'var(--spacing-sm)',
        backgroundColor: '#ff9800',
        color: '#fff',
        borderRadius: 'var(--radius-md)',
        textAlign: 'center',
        position: 'relative',
        boxSizing: 'border-box',
      }}
    >
      <strong>{data.label}</strong>
      <div style={{ fontSize: '0.85rem', marginBottom: 'var(--spacing-xs)' }}>
        User
      </div>
      <div
        style={{
          fontSize: '0.75rem',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          padding: 'var(--spacing-xs)',
          borderRadius: 'var(--radius-sm)',
          maxHeight: '6em',
          overflow: 'hidden',
          wordBreak: 'break-word',
        }}
      >
        {data.description ? data.description.slice(0, 300) : 'No description provided.'}
      </div>

      {/* Top */}
      <Handle type="source" position={Position.Top} id="top-source" style={handleStyle({ left: '50%' })} />
      <Handle type="target" position={Position.Top} id="top-target" style={handleStyle({ left: '50%' })} />
      {/* Bottom */}
      <Handle type="source" position={Position.Bottom} id="bottom-source" style={handleStyle({ left: '50%' })} />
      <Handle type="target" position={Position.Bottom} id="bottom-target" style={handleStyle({ left: '50%' })} />
      {/* Left */}
      <Handle type="source" position={Position.Left} id="left-source" style={handleStyle({ top: '50%' })} />
      <Handle type="target" position={Position.Left} id="left-target" style={handleStyle({ top: '50%' })} />
      {/* Right */}
      <Handle type="source" position={Position.Right} id="right-source" style={handleStyle({ top: '50%' })} />
      <Handle type="target" position={Position.Right} id="right-target" style={handleStyle({ top: '50%' })} />
    </div>
  );
};

export default UserNode;
