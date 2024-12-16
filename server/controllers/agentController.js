const { callOpenAI } = require('../utils/openai');

const generateContent = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt in request body' });
  }

  try {
    const messages = [
      { 
        role: 'system', 
        content: 'You are a Content Officer AI that specializes in creating short, engaging blog posts and social media content.' 
      },
      { role: 'user', content: prompt }
    ];

    const result = await callOpenAI(messages);
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

module.exports = {
  generateContent
};
