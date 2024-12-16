/**
 * @typedef {Object} AgentStats
 * @property {number} activeAgents - Number of currently active agents
 * @property {number} tasksInQueue - Number of tasks waiting to be processed
 * @property {number} processing - Number of tasks currently being processed
 * @property {number} completedToday - Number of tasks completed today
 */

/**
 * @typedef {Object} AgentActivity
 * @property {string} task - Description of the task
 * @property {'completed'|'in_progress'|'queued'|'failed'} status - Current status of the task
 * @property {string} timestamp - When the activity occurred
 * @property {string} [details] - Additional details about the task
 * @property {Object} [metrics] - Task-specific metrics
 */

/**
 * @typedef {Object} Agent
 * @property {string} id - Unique identifier for the agent
 * @property {string} name - Display name of the agent
 * @property {'Writer'|'Coder'|'Analyst'|'Designer'|'Researcher'} role - Role of the agent
 * @property {'Active'|'Idle'|'Error'|'Offline'} status - Current status
 * @property {string} [currentTask] - Description of current task
 * @property {number} progress - Progress percentage of current task
 * @property {number} tasksCompleted - Total number of completed tasks
 * @property {AgentActivity[]} activities - List of recent activities
 */

/**
 * @typedef {Object} TaskConfig
 * @property {string} type - Type of task (e.g., 'content_generation')
 * @property {Object} parameters - Task-specific parameters
 * @property {string} [contentType] - Type of content to generate
 * @property {string} [tone] - Desired tone of the content
 * @property {string[]} [keywords] - Target keywords
 * @property {number} [maxLength] - Maximum length of the content
 */

module.exports = {
  // These are just for documentation, as JS doesn't actually use these types at runtime
  AgentStats: {},
  AgentActivity: {},
  Agent: {},
  TaskConfig: {}
};
