const EventEmitter = require('events');

class AgentManager extends EventEmitter {
  constructor() {
    super();
    this.agents = new Map();
    this.taskQueues = new Map();
    this.stats = {
      activeAgents: 0,
      tasksInQueue: 0,
      processing: 0,
      completedToday: 0
    };

    // Reset completedToday at midnight
    this.setupDailyReset();
  }

  setupDailyReset() {
    const resetStats = () => {
      this.stats.completedToday = 0;
    };

    // Calculate time until next midnight
    const now = new Date();
    const night = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1, // tomorrow
      0, 0, 0 // midnight
    );
    const msToMidnight = night.getTime() - now.getTime();

    // Setup daily reset
    setTimeout(() => {
      resetStats();
      // Setup reset for next day
      setInterval(resetStats, 24 * 60 * 60 * 1000);
    }, msToMidnight);
  }

  /**
   * Register a new agent with the manager
   * @param {import('../types/AgentTypes').Agent} agent 
   */
  registerAgent(agent) {
    // Store the actual agent instance
    this.agents.set(agent.id, agent);
    this.taskQueues.set(agent.id, []);
    this.stats.activeAgents = this.agents.size;
    this.emit('agentRegistered', agent.id);
  }

  /**
   * Get current system-wide stats
   * @returns {import('../types/AgentTypes').AgentStats}
   */
  getStats() {
    return { ...this.stats };
  }

  /**
   * Get agent details (safe for JSON serialization)
   * @param {string} agentId 
   */
  getAgentDetails(agentId) {
    const agent = this.agents.get(agentId);
    if (!agent) return null;

    return {
      id: agent.id,
      name: agent.name,
      role: agent.role,
      status: agent.status,
      currentTask: agent.currentTask,
      progress: agent.progress,
      tasksCompleted: agent.tasksCompleted,
      activities: agent.activities || []
    };
  }

  /**
   * Get the actual agent instance
   * @param {string} agentId 
   */
  getAgent(agentId) {
    return this.agents.get(agentId);
  }

  /**
   * Get a list of all agents (safe for JSON serialization)
   */
  getAgentList() {
    return Array.from(this.agents.values()).map(agent => ({
      id: agent.id,
      name: agent.name,
      role: agent.role,
      status: agent.status,
      currentTask: agent.currentTask,
      progress: agent.progress,
      tasksCompleted: agent.tasksCompleted,
      activities: agent.activities || []
    }));
  }

  /**
   * Update an agent's status and emit event
   * @param {string} agentId 
   * @param {string} status 
   * @param {number} progress 
   */
  updateAgentStatus(agentId, status, progress = 0) {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.status = status;
      agent.progress = progress;
      this.emit('agentStatusUpdated', { agentId, status, progress });
    }
  }

  /**
   * Add a task to an agent's queue
   * @param {string} agentId 
   * @param {import('../types/AgentTypes').TaskConfig} task 
   */
  queueTask(agentId, task) {
    const queue = this.taskQueues.get(agentId);
    if (queue) {
      queue.push(task);
      this.stats.tasksInQueue++;
      this.emit('taskQueued', { agentId, task });
    }
  }

  /**
   * Record a completed task for an agent
   * @param {string} agentId 
   * @param {import('../types/AgentTypes').TaskConfig} task 
   * @param {Object} result 
   */
  completeTask(agentId, task, result) {
    const agent = this.agents.get(agentId);
    if (agent) {
      agent.tasksCompleted++;
      agent.activities.unshift({
        task: task.type,
        status: 'completed',
        timestamp: new Date().toISOString(),
        details: result.summary || '',
        metrics: result.metrics || {}
      });
      
      // Keep only recent activities
      if (agent.activities.length > 10) {
        agent.activities.pop();
      }

      this.stats.completedToday++;
      this.stats.processing--;
      this.emit('taskCompleted', { agentId, task, result });
    }
  }
}

// Create singleton instance
const agentManager = new AgentManager();

module.exports = agentManager;
