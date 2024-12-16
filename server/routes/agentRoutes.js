const express = require('express');
const { generateContent } = require('../controllers/agentController');

const router = express.Router();

router.post('/content', generateContent);

module.exports = router;
