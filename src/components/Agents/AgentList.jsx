import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  LinearProgress,
  Avatar,
  Chip,
  useTheme,
  Skeleton,
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

const getRoleIcon = (role) => {
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

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'success';
    case 'busy':
      return 'warning';
    case 'idle':
      return 'info';
    default:
      return 'default';
  }
};

const MotionCard = motion.create(Card);

const AgentCardSkeleton = () => {
  const theme = useTheme();
  
  return (
    <MotionCard
      whileHover={{ y: -5, boxShadow: theme.shadows[8] }}
      sx={{ height: '100%', position: 'relative' }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        </Box>
        <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="rectangular" height={4} sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton variant="text" width="30%" height={20} />
          <Skeleton variant="rounded" width={60} height={24} />
        </Box>
      </CardContent>
    </MotionCard>
  );
};

const AgentCard = ({ agent, onClick, selected }) => {
  const theme = useTheme();
  
  return (
    <MotionCard
      whileHover={{ y: -5, boxShadow: theme.shadows[8] }}
      onClick={onClick}
      sx={{ 
        height: '100%', 
        position: 'relative',
        cursor: 'pointer',
        background: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        border: `1px solid ${theme.palette.divider}`,
        '&.Mui-selected': {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
        }
      }}
      className={selected ? 'Mui-selected' : ''}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{ 
              mr: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}22, ${theme.palette.primary.main}44)`,
              border: `1px solid ${theme.palette.primary.main}33`,
            }}
          >
            {getRoleIcon(agent.role)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="div">
              {agent.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                {agent.role}
              </Typography>
              <Chip 
                label={agent.status} 
                size="small" 
                color={getStatusColor(agent.status)}
                sx={{ height: 20 }}
              />
            </Box>
          </Box>
        </Box>

        {agent.currentTask ? (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {agent.currentTask}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={agent.progress} 
              sx={{ 
                mb: 2,
                height: 4,
                borderRadius: 2,
                bgcolor: `${theme.palette.primary.main}22`,
                '& .MuiLinearProgress-bar': {
                  bgcolor: theme.palette.primary.main,
                }
              }} 
            />
          </>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No active task
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Tasks Completed
          </Typography>
          <Chip 
            label={agent.tasksCompleted} 
            size="small"
            sx={{ 
              background: `linear-gradient(45deg, ${theme.palette.primary.main}22, ${theme.palette.primary.main}44)`,
              border: `1px solid ${theme.palette.primary.main}33`,
              color: theme.palette.primary.main,
            }}
          />
        </Box>
      </CardContent>
    </MotionCard>
  );
};

const AgentList = ({ agents, isLoading = false }) => {
  const [selectedAgentId, setSelectedAgentId] = React.useState(null);
  const [showDetails, setShowDetails] = React.useState(false);

  const handleAgentClick = (agent) => {
    setSelectedAgentId(agent.id);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
  };

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        {[1, 2, 3].map((index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AgentCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {agents.map((agent) => (
          <Grid item xs={12} sm={6} md={4} key={agent.id}>
            <AgentCard 
              agent={agent} 
              onClick={() => handleAgentClick(agent)}
              selected={selectedAgentId === agent.id}
            />
          </Grid>
        ))}
      </Grid>
      <AgentDetails
        open={showDetails}
        onClose={handleCloseDetails}
        agent={agents.find(a => a.id === selectedAgentId)}
      />
    </Box>
  );
};

AgentCard.propTypes = {
  agent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    currentTask: PropTypes.string,
    progress: PropTypes.number,
    tasksCompleted: PropTypes.number,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
};

AgentList.propTypes = {
  agents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      currentTask: PropTypes.string,
      progress: PropTypes.number,
      tasksCompleted: PropTypes.number,
      activities: PropTypes.array.isRequired,
      metrics: PropTypes.object,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
};

export default AgentList;
