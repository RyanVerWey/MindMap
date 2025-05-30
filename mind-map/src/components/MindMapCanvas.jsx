import React from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const MindMapCanvas = ({ nodes, setNodes, edges, setEdges }) => {
  const canvasStyles = {
    height: '600px',
    border: '2px solid #333',
    borderRadius: '8px',
    margin: '1rem 0',
    backgroundColor: '#fff',
  };

  const onNodesChange = (changes) => setNodes((nds) => nds.map((node) => {
    const change = changes.find((c) => c.id === node.id);
    return change ? { ...node, ...change } : node;
  }));

  const onEdgesChange = (changes) => setEdges((eds) => eds.map((edge) => {
    const change = changes.find((c) => c.id === edge.id);
    return change ? { ...edge, ...change } : edge;
  }));

  return (
    <div style={canvasStyles}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MindMapCanvas;
