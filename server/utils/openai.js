const fetch = require('node-fetch');
const { config } = require('../config/config');

const callOpenAI = async (messages, options = {}) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.openai.apiKey}`
      },
      body: JSON.stringify({
        model: options.model || config.openai.model,
        messages,
        max_tokens: options.maxTokens || config.openai.maxTokens,
        temperature: options.temperature || config.openai.temperature
      })
    });

    const data = await response.json();
    
    if (data.error) {
      console.error('OpenAI API Error:', data.error);
      throw new Error(data.error.message || 'OpenAI API error');
    }

    return data.choices?.[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
};

module.exports = { callOpenAI };
