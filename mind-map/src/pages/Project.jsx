import React, { useState } from 'react';
import MindMapCanvas from '../components/MindMapCanvas';
import NodeControlPanel from '../components/NodeControlPanel';
import SaveLoadButtons from '../components/SaveLoadButtons';

const Project = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  return (
    <div>
      <h2>Mind Map Project</h2>
      <SaveLoadButtons setNodes={setNodes} setEdges={setEdges} />
      <MindMapCanvas nodes={nodes} setNodes={setNodes} edges={edges} setEdges={setEdges} />
      <NodeControlPanel setNodes={setNodes} />
    </div>
  );
};

export default Project;
