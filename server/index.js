const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { config, validateConfig } = require('./config/config');
const agentRoutes = require('./routes/agentRoutes');

// Load environment variables
dotenv.config();

// Debug: Log environment variables (safely)
console.log('Environment variables loaded:', {
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'Set (hidden for security)' : 'Not set',
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT
});

// Validate configuration
try {
  validateConfig();
  console.log('Configuration validated successfully');
} catch (error) {
  console.error('Configuration error:', error.message);
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/agent', agentRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    environment: config.server.env,
    openAiModel: config.openai.model
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error',
    message: config.server.env === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port} in ${config.server.env} mode`);
  console.log(`Using OpenAI model: ${config.openai.model}`);
});
