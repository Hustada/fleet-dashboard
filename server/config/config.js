const config = {
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4-1106-preview',
    temperature: parseFloat(process.env.OPENAI_TEMPERATURE) || 0.7,
    maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS) || 2000
  },
  server: {
    port: process.env.PORT || 3001,
    env: process.env.NODE_ENV || 'development'
  }
};

// Debug: Log the actual value being checked
console.log('Debug - API Key check:', {
  exists: !!process.env.OPENAI_API_KEY,
  length: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0
});

// Validate required environment variables
const validateConfig = () => {
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.trim() === '') {
    throw new Error('OPENAI_API_KEY is required but not set in environment variables');
  }
  
  // Store the validated key
  config.openai.apiKey = process.env.OPENAI_API_KEY.trim();
};

module.exports = {
  config,
  validateConfig
};
