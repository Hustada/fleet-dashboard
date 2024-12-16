const { v4: uuidv4 } = require('uuid');
const { callOpenAI } = require('../utils/openai');
const agentManager = require('../services/AgentManager');

class ContentOfficer {
  constructor(name = 'Content Officer') {
    this.id = `content-officer-${uuidv4()}`;
    this.name = name;
    this.role = 'Writer';
    this.status = 'Active';
    this.currentTask = null;
    this.progress = 0;
    this.tasksCompleted = 0;
    this.activities = [];
    this.taskQueue = [];
    this.memory = [];
    
    // Register this instance with the agent manager
    agentManager.registerAgent(this);
  }

  /**
   * Process a content generation task
   * @param {import('../types/AgentTypes').TaskConfig} task 
   */
  async processTask(task) {
    try {
      agentManager.updateAgentStatus(this.id, 'Active', 0);
      
      // Construct the prompt based on task parameters
      const systemPrompt = this.constructSystemPrompt(task);
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: task.parameters.prompt }
      ];

      // Update status to show we're processing
      agentManager.updateAgentStatus(this.id, 'Active', 25);
      
      // Call OpenAI
      const result = await callOpenAI(messages);
      
      // Update progress
      agentManager.updateAgentStatus(this.id, 'Active', 75);

      // Process and structure the result
      const processedResult = {
        content: result,
        summary: `Generated ${task.parameters.contentType || 'content'} based on prompt`,
        metrics: {
          words: result.split(' ').length,
          characters: result.length
        }
      };

      // Complete the task
      agentManager.completeTask(this.id, task, processedResult);
      agentManager.updateAgentStatus(this.id, 'Idle', 100);

      return processedResult;
    } catch (error) {
      agentManager.updateAgentStatus(this.id, 'Error', 0);
      throw error;
    }
  }

  /**
   * Construct system prompt based on task parameters
   * @param {import('../types/AgentTypes').TaskConfig} task 
   */
  constructSystemPrompt(task) {
    const { contentType, tone, keywords = [] } = task.parameters;
    
    let prompt = 'You are a professional Content Officer AI specializing in creating engaging content. ';
    
    if (contentType) {
      prompt += `You are currently focused on creating ${contentType}. `;
    }
    
    if (tone) {
      prompt += `The tone should be ${tone}. `;
    }
    
    if (keywords.length > 0) {
      prompt += `Please incorporate these keywords naturally: ${keywords.join(', ')}. `;
    }

    prompt += 'Ensure the content is original, engaging, and matches the specified parameters.';
    
    return prompt;
  }

  /**
   * Add a task to this agent's queue
   * @param {import('../types/AgentTypes').TaskConfig} task 
   */
  async addTask(task) {
    this.taskQueue.push(task);
    agentManager.queueTask(this.id, task);
    return this.processTask(task);
  }
}

module.exports = ContentOfficer;
