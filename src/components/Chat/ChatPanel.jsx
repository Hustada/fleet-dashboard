import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';

const ChatPanel = ({ agents, onClose }) => {
  const [selectedAgent, setSelectedAgent] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleAgentChange = (event) => {
    setSelectedAgent(event.target.value);
    setMessages([]); // Clear messages when switching agents
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedAgent) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessageInput('');

    // Simulate bot response
    setTimeout(() => {
      const agent = agents.find(a => a.id === selectedAgent);
      const botMessage = {
        id: Date.now(),
        text: `I am the ${agent.role}. I can help you with ${agent.role.toLowerCase()}-related tasks.`,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      bgcolor: 'background.default',
      p: 2 
    }}>
      {/* Header with Close Button */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 2
      }}>
        <Typography variant="h6">Chat</Typography>
        <IconButton onClick={onClose} edge="end" aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Agent Selector */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="agent-select-label">Select Agent</InputLabel>
        <Select
          labelId="agent-select-label"
          id="agent-select"
          value={selectedAgent}
          onChange={handleAgentChange}
          label="Select Agent"
        >
          {agents.map((agent) => (
            <MenuItem key={agent.id} value={agent.id}>
              {agent.name} ({agent.role})
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Messages Area */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        mb: 2
      }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <Paper
              sx={{
                p: 1.5,
                maxWidth: '70%',
                bgcolor: message.sender === 'user' ? 'primary.main' : 'background.paper',
                color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
              }}
            >
              <Typography variant="body1">{message.text}</Typography>
              <Typography variant="caption" color={message.sender === 'user' ? 'primary.contrastText' : 'text.secondary'}>
                {new Date(message.timestamp).toLocaleTimeString()}
              </Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Input Area */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder={selectedAgent ? 'Type a message...' : 'Select an agent to start chatting'}
          disabled={!selectedAgent}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={!selectedAgent || !messageInput.trim()}
          aria-label="send message"
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatPanel;
