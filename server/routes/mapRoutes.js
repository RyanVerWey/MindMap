const express = require('express');
const router = express.Router();
const MindMap = require('../models/MindMap');

// Hardcoded meaningful templates
const templates = {
  'frontend-workflow': {
    nodes: [
      { id: '1', type: 'process', data: { label: 'Design', description: 'Wireframes, mockups', width: 180, height: 100 }, position: { x: 100, y: 100 } },
      { id: '2', type: 'workflow', data: { label: 'Development', description: 'React, CSS, APIs', width: 180, height: 100 }, position: { x: 300, y: 100 } },
      { id: '3', type: 'user', data: { label: 'Testing', description: 'QA, UAT, feedback', width: 180, height: 100 }, position: { x: 500, y: 100 } },
      { id: '4', type: 'dimensions', data: { label: 'Deployment', description: 'CI/CD, staging, production', width: 180, height: 100 }, position: { x: 700, y: 100 } },
    ],
    edges: [
      { id: 'edge-1-2', source: '1', target: '2' },
      { id: 'edge-2-3', source: '2', target: '3' },
      { id: 'edge-3-4', source: '3', target: '4' },
    ],
  },
  'bug-fix-workflow': {
    nodes: [
      { id: '1', type: 'process', data: { label: 'Bug Reported', description: 'Issue created', width: 180, height: 100 }, position: { x: 100, y: 100 } },
      { id: '2', type: 'workflow', data: { label: 'Triage', description: 'Severity, priority', width: 180, height: 100 }, position: { x: 300, y: 100 } },
      { id: '3', type: 'user', data: { label: 'Fix & Commit', description: 'Developer resolves', width: 180, height: 100 }, position: { x: 500, y: 100 } },
      { id: '4', type: 'dimensions', data: { label: 'QA Review', description: 'Verify fix', width: 180, height: 100 }, position: { x: 700, y: 100 } },
      { id: '5', type: 'process', data: { label: 'Release', description: 'Push to prod', width: 180, height: 100 }, position: { x: 900, y: 100 } },
    ],
    edges: [
      { id: 'edge-1-2', source: '1', target: '2' },
      { id: 'edge-2-3', source: '2', target: '3' },
      { id: 'edge-3-4', source: '3', target: '4' },
      { id: 'edge-4-5', source: '4', target: '5' },
    ],
  },
};

// Get all saved map names
router.get('/maps', async (req, res) => {
  try {
    const maps = await MindMap.find({}, 'name');
    const names = maps.map((map) => map.name);
    res.json({ maps: names });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get map by name
router.get('/map/:name', async (req, res) => {
  try {
    const map = await MindMap.findOne({ name: req.params.name });
    if (map) {
      res.json(map);
    } else {
      res.status(404).json({ error: 'Map not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save or update map by name
router.post('/map', async (req, res) => {
  try {
    const { name, nodes, edges } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Map name is required' });
    }

    let map = await MindMap.findOne({ name });
    if (map) {
      map.nodes = nodes;
      map.edges = edges;
      await map.save();
    } else {
      map = await MindMap.create({ name, nodes, edges });
    }
    res.json({ message: `Map "${name}" saved successfully`, map });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a map by name
router.delete('/map/:name', async (req, res) => {
  try {
    const result = await MindMap.findOneAndDelete({ name: req.params.name });
    if (result) {
      res.json({ message: `Map "${req.params.name}" deleted successfully` });
    } else {
      res.status(404).json({ error: 'Map not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a hardcoded template by name
router.get('/template/:name', (req, res) => {
  const template = templates[req.params.name];
  if (template) {
    res.json(template);
  } else {
    res.status(404).json({ error: 'Template not found' });
  }
});

module.exports = router;
