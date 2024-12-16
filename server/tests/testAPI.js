require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001/api';

async function runTests() {
  console.log('🚀 Starting API Tests\n');

  try {
    // Test 1: Get all agents
    console.log('Test 1: Get Agents');
    const agentsResponse = await fetch(`${BASE_URL}/agents`);
    const agentsData = await agentsResponse.json();
    console.log('Agents:', agentsData);
    console.log('Status:', agentsResponse.status === 200 ? '✅ Passed' : '❌ Failed');
    console.log('\n-------------------\n');

    // Test 2: Get agent stats
    console.log('Test 2: Get Stats');
    const statsResponse = await fetch(`${BASE_URL}/stats`);
    const statsData = await statsResponse.json();
    console.log('Stats:', statsData);
    console.log('Status:', statsResponse.status === 200 ? '✅ Passed' : '❌ Failed');
    console.log('\n-------------------\n');

    // Test 3: Submit content generation task
    console.log('Test 3: Submit Content Task');
    const taskResponse = await fetch(`${BASE_URL}/content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'Write a short tweet about AI and productivity'
      })
    });
    const taskData = await taskResponse.json();
    console.log('Task Result:', taskData);
    console.log('Status:', taskResponse.status === 200 ? '✅ Passed' : '❌ Failed');
    console.log('\n-------------------\n');

    // Test 4: Get specific agent details (using first agent from Test 1)
    if (agentsData.agents && agentsData.agents.length > 0) {
      console.log('Test 4: Get Agent Details');
      const firstAgentId = agentsData.agents[0].id;
      const agentResponse = await fetch(`${BASE_URL}/agents/${firstAgentId}`);
      const agentData = await agentResponse.json();
      console.log('Agent Details:', agentData);
      console.log('Status:', agentResponse.status === 200 ? '✅ Passed' : '❌ Failed');
      console.log('\n-------------------\n');

      // Test 5: Submit task to specific agent
      console.log('Test 5: Submit Task to Specific Agent');
      console.log('Using agent ID:', firstAgentId);
      
      const taskData = {
        agentId: firstAgentId,
        task: {
          type: 'content_generation',
          parameters: {
            contentType: 'social_media_post',
            prompt: 'Write about the future of AI agents'
          }
        }
      };
      console.log('Sending task data:', JSON.stringify(taskData, null, 2));

      const specificTaskResponse = await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      
      const specificTaskData = await specificTaskResponse.json();
      console.log('Response status:', specificTaskResponse.status);
      console.log('Response headers:', Object.fromEntries(specificTaskResponse.headers.entries()));
      console.log('Specific Task Result:', specificTaskData);
      console.log('Status:', specificTaskResponse.status === 200 ? '✅ Passed' : '❌ Failed');
    }

  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }
}

// Only run if directly executed
if (require.main === module) {
  runTests();
}
