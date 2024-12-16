const { callOpenAI } = require('../utils/openai');
const agentManager = require('../services/AgentManager');
const ContentOfficer = require('../agents/ContentOfficer');

// Create and register the default officer
const defaultOfficer = new ContentOfficer('Default Content Officer');
agentManager.registerAgent(defaultOfficer);

const generateContent = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt in request body' });
  }

  try {
    // Convert to new task format
    const task = {
      type: 'content_generation',
      parameters: {
        contentType: 'general',
        prompt
      }
    };

    const result = await defaultOfficer.addTask(task);
    return res.json({ result });
  } catch (error) {
    console.error('Content generation error:', error);
    return res.status(500).json({ 
      error: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Internal server error' 
    });
  }
};

// New endpoints for agent management
const getAgents = async (req, res) => {
  try {
    const agents = agentManager.getAgentList();
    res.json({ agents });
  } catch (error) {
    console.error('Error getting agents:', error);
    res.status(500).json({ error: 'Failed to get agents' });
  }
};

const getAgentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const agent = agentManager.getAgentDetails(id);
    if (!agent) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.json({ agent });
  } catch (error) {
    console.error('Error getting agent details:', error);
    res.status(500).json({ error: 'Failed to get agent details' });
  }
};

const getAgentStats = async (req, res) => {
  try {
    const stats = agentManager.getStats();
    res.json({ stats });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get agent stats' });
  }
};

const submitTask = async (req, res) => {
  try {
    const { agentId, task } = req.body;
    
    console.log('Received task request:', { agentId, task });
    
    if (!agentId || !task) {
      return res.status(400).json({ 
        error: 'Missing required fields: agentId and task' 
      });
    }

    // Get the agent instance
    const agent = agentManager.getAgent(agentId);
    console.log('Found agent:', agent ? 'Yes' : 'No');
    console.log('Agent type:', agent ? agent.constructor.name : 'N/A');
    console.log('Agent methods:', agent ? Object.getOwnPropertyNames(Object.getPrototypeOf(agent)) : []);
    
    if (!agent) {
      return res.status(404).json({ 
        error: 'Agent not found',
        requestedId: agentId,
        availableIds: Array.from(agentManager.agents.keys())
      });
    }

    const result = await agent.addTask(task);
    res.json({ result });
  } catch (error) {
    console.error('Detailed error in submitTask:', {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      error: 'Failed to submit task',
      details: error.message 
    });
  }
};

module.exports = {
  generateContent,
  getAgents,
  getAgentDetails,
  getAgentStats,
  submitTask
};
