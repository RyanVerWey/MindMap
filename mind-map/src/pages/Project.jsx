import React, { useState, useRef } from 'react';
import MindMapCanvas from '../components/MindMapCanvas';
import NodeControlPanel from '../components/NodeControlPanel';
import SaveLoadButtons from '../components/SaveLoadButtons';
import EditNodeModal from '../components/EditNodeModal';
import EdgeEditModal from '../components/EdgeEditModal';

const Project = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [editingNode, setEditingNode] = useState(null);
  const [editingEdge, setEditingEdge] = useState(null);
  const [showGrid, setShowGrid] = useState(true); // ✅ new state

  const canvasRef = useRef(null);

  const handleSaveEditNode = (updatedNode) => {
    setNodes((prevNodes) =>
      prevNodes.map((n) => (n.id === updatedNode.id ? updatedNode : n))
    );
  };

  const handleDeleteNode = (nodeId) => {
    setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    setEdges((prev) => prev.filter((e) => e.source !== nodeId && e.target !== nodeId));
    setEditingNode(null);
  };

  const handleSaveEditEdge = (updatedEdge) => {
    setEdges((prevEdges) =>
      prevEdges.map((e) =>
        e.id === updatedEdge.id
          ? {
              ...e,
              data: {
                ...e.data,
                annotation: updatedEdge.data.annotation,
              },
            }
          : e
      )
    );
    setEditingEdge(null);
  };

  const handleDeleteEdge = (edgeId) => {
    setEdges((prevEdges) => prevEdges.filter((e) => e.id !== edgeId));
    setEditingEdge(null);
  };

  const toggleGrid = () => {
    setShowGrid((prev) => !prev);
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: 'calc(100vh - 60px)',
        boxSizing: 'border-box',
        padding: 'var(--spacing-md)',
        gap: 'var(--spacing-md)',
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          width: '320px',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          padding: 'var(--spacing-md)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <NodeControlPanel
          nodes={nodes}
          setNodes={setNodes}
          setEdges={setEdges}
          canvasRef={canvasRef}
        />
        <SaveLoadButtons setNodes={setNodes} setEdges={setEdges} />

        <button
          onClick={toggleGrid}
          style={{
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: showGrid ? '#f44336' : '#4caf50',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          {showGrid ? '🛑 Hide Grid' : '📐 Show Grid'}
        </button>
      </div>

      {/* Right Canvas */}
      <div
        style={{
          flexGrow: 1,
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-md)',
          padding: 'var(--spacing-md)',
          display: 'flex',
        }}
      >
        <MindMapCanvas
          ref={canvasRef}
          nodes={nodes}
          setNodes={setNodes}
          edges={edges}
          setEdges={setEdges}
          onNodeClick={(e, node) => setEditingNode(node)}
          onEdgeClick={(e, edge) => setEditingEdge(edge)}
          showGrid={showGrid} // ✅ pass grid toggle
        />
      </div>

      {/* Modals */}
      <EditNodeModal
        node={editingNode}
        isOpen={!!editingNode}
        onClose={() => setEditingNode(null)}
        onSave={handleSaveEditNode}
        onDelete={handleDeleteNode}
      />
      <EdgeEditModal
        edge={editingEdge}
        isOpen={!!editingEdge}
        onClose={() => setEditingEdge(null)}
        onSave={handleSaveEditEdge}
        onDelete={handleDeleteEdge}
      />
    </div>
  );
};

export default Project;
