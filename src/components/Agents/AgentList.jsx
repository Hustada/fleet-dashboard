import React from 'react';
import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Avatar, 
  Chip, 
  LinearProgress,
  useTheme 
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  SmartToy as AgentIcon,
  Edit as WriterIcon,
  Code as CoderIcon,
  Analytics as AnalystIcon,
  Brush as DesignerIcon,
  Psychology as ResearcherIcon,
} from '@mui/icons-material';
import AgentDetails from './AgentDetails';

const AgentCard = ({ agent, onClick }) => {
  const theme = useTheme();
  
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return theme.palette.success.main;
      case 'idle':
        return theme.palette.info.main;
      case 'busy':
        return theme.palette.warning.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const getAgentIcon = (role) => {
    switch (role.toLowerCase()) {
      case 'writer':
        return <WriterIcon />;
      case 'coder':
        return <CoderIcon />;
      case 'analyst':
        return <AnalystIcon />;
      case 'designer':
        return <DesignerIcon />;
      case 'researcher':
        return <ResearcherIcon />;
      default:
        return <AgentIcon />;
    }
  };

  return (
    <Paper
      component={motion.div}
      whileHover={{ y: -5, boxShadow: theme.shadows[8] }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      sx={{
        p: 3,
        height: '100%',
        background: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        border: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        cursor: 'pointer'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            width: 56,
            height: 56
          }}
        >
          {getAgentIcon(agent.role)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {agent.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {agent.role}
          </Typography>
        </Box>
        <Chip
          label={agent.status}
          size="small"
          sx={{
            bgcolor: `${getStatusColor(agent.status)}22`,
            color: getStatusColor(agent.status),
            borderRadius: 1,
            '& .MuiChip-label': {
              px: 2,
              py: 0.5
            }
          }}
        />
      </Box>

      {agent.currentTask && (
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Current Task
          </Typography>
          <Typography variant="body1" gutterBottom>
            {agent.currentTask}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={agent.progress} 
              sx={{
                height: 6,
                borderRadius: 1,
                bgcolor: `${theme.palette.primary.main}22`,
                '& .MuiLinearProgress-bar': {
                  bgcolor: theme.palette.primary.main
                }
              }}
            />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ mt: 0.5, textAlign: 'right' }}
            >
              {agent.progress}% Complete
            </Typography>
          </Box>
        </Box>
      )}

      <Box sx={{ mt: 'auto', pt: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="body2" color="text.secondary">
          Tasks Completed Today: {agent.tasksCompleted}
        </Typography>
      </Box>
    </Paper>
  );
};

const AgentList = () => {
  const [selectedAgent, setSelectedAgent] = React.useState(null);
  // Dummy data for demonstration
  const agents = [
    {
      name: 'Content Writer',
      role: 'Writer',
      status: 'Active',
      currentTask: 'Writing blog post about AI trends',
      progress: 65,
      tasksCompleted: 8
    },
    {
      name: 'Code Assistant',
      role: 'Coder',
      status: 'Busy',
      currentTask: 'Reviewing pull request #42',
      progress: 30,
      tasksCompleted: 12
    },
    {
      name: 'Data Analyst',
      role: 'Analyst',
      status: 'Idle',
      currentTask: null,
      progress: 0,
      tasksCompleted: 5
    },
    {
      name: 'UI Designer',
      role: 'Designer',
      status: 'Active',
      currentTask: 'Creating new component library',
      progress: 85,
      tasksCompleted: 6
    },
    {
      name: 'Research Agent',
      role: 'Researcher',
      status: 'Active',
      currentTask: 'Analyzing market trends',
      progress: 45,
      tasksCompleted: 7
    }
  ];

  return (
    <Box sx={{ py: 3 }}>
      <Typography 
        variant="h4" 
        component={motion.h4}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        sx={{ mb: 4, fontWeight: 'bold' }}
      >
        AI Agents
      </Typography>

      <Grid container spacing={3}>
        {agents.map((agent, index) => (
          <Grid 
            item 
            xs={12} 
            md={6} 
            lg={4} 
            key={agent.name}
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <AgentCard 
              agent={agent} 
              onClick={() => setSelectedAgent(agent)}
            />
          </Grid>
        ))}
      </Grid>

      <AgentDetails
        open={!!selectedAgent}
        onClose={() => setSelectedAgent(null)}
        agent={selectedAgent}
      />
    </Box>
  );
};

export default AgentList;
