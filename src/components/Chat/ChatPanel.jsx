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
  Drawer
} from '@mui/material';
import { Send as SendIcon, Close as CloseIcon } from '@mui/icons-material';

const ChatPanel = ({ agents, open, onClose }) => {
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
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
        disablePortal: true,
        slotProps: {
          backdrop: {
            'aria-hidden': false
          }
        }
      }}
      PaperProps={{
        sx: {
          width: {
            xs: '100%',
            sm: 400
          },
          bgcolor: 'background.paper'
        }
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box'
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 2
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Chat</Typography>
          <IconButton onClick={onClose} size="small">
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
            displayEmpty
            renderValue={(selected) => {
              if (!selected) return "Select an agent";
              const agent = agents.find(a => a.id === selected);
              return agent ? agent.name : "Select an agent";
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  bgcolor: 'background.paper',
                  '& .MuiMenuItem-root': {
                    bgcolor: 'background.paper',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }
                }
              },
              keepMounted: true,
              disablePortal: true,
              slotProps: {
                paper: {
                  'aria-hidden': false
                }
              }
            }}
            sx={{
              width: '100%',
              bgcolor: 'background.paper',
              '& .MuiSelect-select': {
                bgcolor: 'background.paper'
              }
            }}
          >
            <MenuItem value="">
              <em>Select an agent</em>
            </MenuItem>
            {agents.map((agent) => (
              <MenuItem 
                key={agent.id} 
                value={agent.id}
                sx={{
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                {agent.name}
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
    </Drawer>
  );
};

export default ChatPanel;
