const mongoose = require('mongoose');

const mindMapSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  nodes: Array,
  edges: Array,
}, { collection: 'mindmap' });

module.exports = mongoose.model('MindMap', mindMapSchema);
