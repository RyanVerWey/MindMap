import React, { forwardRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';
import DimensionsNode from './DimensionsNode';
import ProcessNode from './ProcessNode';
import WorkflowNode from './WorkflowNode';
import UserNode from './UserNode';
import '@xyflow/react/dist/style.css';

const nodeTypes = {
  dimensions: DimensionsNode,
  process: ProcessNode,
  workflow: WorkflowNode,
  user: UserNode,
};

const edgeLabelStyle = {
  fontSize: 12,
  background: '#f8f9fa',
  padding: '2px 6px',
  borderRadius: '6px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  pointerEvents: 'none',
};

const MindMapCanvas = forwardRef(
  (
    { nodes, setNodes, edges, setEdges, onNodeClick, onEdgeClick, showGrid },
    ref
  ) => {
    const onNodesChange = (changes) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
    };

    const onEdgesChange = (changes) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
    };

    const onConnect = (connection) => {
      setEdges((eds) => addEdge(connection, eds));
    };

    const onEdgeDoubleClick = (event, edge) => {
      setEdges((prev) => prev.filter((e) => e.id !== edge.id));
    };

    const edgesWithLabels = edges.map((e) => {
      const fullText = e.data?.annotation || '';
      const mainText = fullText.slice(0, 30);
      const overflowCount = fullText.length > 30 ? fullText.length - 30 : 0;

      const finalLabel =
        overflowCount > 0 ? `${mainText} (+${overflowCount} chars)` : mainText;

      return {
        ...e,
        label: finalLabel,
        labelStyle: edgeLabelStyle,
      };
    });

    return (
      <div
        ref={ref}
        className="custom-flow-container"
        style={{
          flexGrow: 1,
          height: '100%',
          width: '100%',
          position: 'relative',
          backgroundColor: 'transparent',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edgesWithLabels}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          onEdgeDoubleClick={onEdgeDoubleClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.1 }}
        >
          {showGrid && <Background gap={12} size={1} />}
          <Controls />
        </ReactFlow>
      </div>
    );
  }
);

export default MindMapCanvas;
