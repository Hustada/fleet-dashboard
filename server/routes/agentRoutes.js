const express = require('express');
const { 
  generateContent, 
  getAgents, 
  getAgentDetails, 
  getAgentStats,
  submitTask 
} = require('../controllers/agentController');

const router = express.Router();

// Agent management routes
router.get('/agents', getAgents);
router.get('/agents/:id', getAgentDetails);
router.get('/stats', getAgentStats);

// Task routes
router.post('/tasks', submitTask);
router.post('/content', generateContent); // Keep for backward compatibility

module.exports = router;
