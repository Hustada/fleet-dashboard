// Load environment variables first
const path = require('path');
const dotenv = require('dotenv');

// Configure path to .env file (one directory up from tests)
const envPath = path.resolve(__dirname, '../.env');
console.log('Looking for .env at:', envPath);

// Load env file with custom path
const result = dotenv.config({ path: envPath });
if (result.error) {
  console.error('Error loading .env file:', result.error);
}

// Debug environment variables
console.log('Loaded env vars:', {
  OPENAI_API_KEY_EXISTS: !!process.env.OPENAI_API_KEY,
  NODE_ENV: process.env.NODE_ENV,
  // Don't log the actual API key for security
});

// Validate OpenAI API Key
if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY is not set in .env file');
  process.exit(1);
}

const ContentOfficer = require('../agents/ContentOfficer');
const agentManager = require('../services/AgentManager');

// Listen for events
agentManager.on('agentRegistered', (agentId) => {
  console.log('🤖 Agent Registered:', agentId);
});

agentManager.on('agentStatusUpdated', ({ agentId, status, progress }) => {
  console.log(`📊 Agent ${agentId} Status:`, status, `(${progress}%)`);
});

agentManager.on('taskQueued', ({ agentId, task }) => {
  console.log('📝 Task Queued for Agent:', agentId, task);
});

agentManager.on('taskCompleted', ({ agentId, task, result }) => {
  console.log('✅ Task Completed by Agent:', agentId);
  console.log('Task Type:', task.type);
  console.log('Result:', result);
});

async function runTest() {
  try {
    console.log('\n🚀 Starting Agent System Test\n');

    // Create a new Content Officer
    const officer = new ContentOfficer('Test Content Officer');
    console.log('Initial Stats:', agentManager.getStats());
    console.log('\nAgent List:', agentManager.getAgentList());

    // Create a test task
    const task = {
      type: 'content_generation',
      parameters: {
        contentType: 'social_media_post',
        tone: 'professional',
        keywords: ['AI', 'innovation'],
        prompt: 'Write a short LinkedIn post about AI innovation in content creation.'
      }
    };

    console.log('\n📋 Submitting task:', task);
    
    // Process the task
    const result = await officer.addTask(task);
    
    console.log('\n📊 Final Stats:', agentManager.getStats());
    console.log('\n🔍 Agent Details:', agentManager.getAgentDetails(officer.id));
    
    console.log('\n✨ Generated Content:', result.content);
    console.log('📈 Metrics:', result.metrics);

  } catch (error) {
    console.error('❌ Test Error:', error);
  }
}

// Run the test
runTest();
