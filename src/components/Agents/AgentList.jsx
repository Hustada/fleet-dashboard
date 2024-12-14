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
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Edit as WriterIcon,
  Code as CoderIcon,
  Analytics as AnalystIcon,
  Brush as DesignerIcon,
  Psychology as ResearcherIcon,
  MoreVert as MoreIcon,
  Chat as ChatIcon,
  Settings as SettingsIcon,
  Info as InfoIcon,
  SmartToy as AgentIcon,
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

const AgentCard = ({ agent, onClick, onAction }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [menuAnchor, setMenuAnchor] = React.useState(null);
  
  const handleClick = () => {
    onClick?.(agent);
  };

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleAction = (action) => () => {
    handleMenuClose();
    onAction?.(action, agent);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        height: '100%',
        cursor: 'pointer',
        position: 'relative',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {agent.role === 'Writer' && <WriterIcon />}
              {agent.role === 'Coder' && <CoderIcon />}
              {agent.role === 'Analyst' && <AnalystIcon />}
              {agent.role === 'Designer' && <DesignerIcon />}
              {agent.role === 'Researcher' && <ResearcherIcon />}
            </Avatar>
            <Box>
              <Typography variant="h6" component="div">
                {agent.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {agent.role}
              </Typography>
            </Box>
          </Box>

          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{ ml: 1 }}
          >
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
            onClick={(e) => e.stopPropagation()}
            PaperProps={{
              sx: {
                bgcolor: 'background.paper',
                '& .MuiMenuItem-root': {
                  bgcolor: 'background.paper',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }
              }
            }}
          >
            <MenuItem onClick={handleAction('message')}>
              <ChatIcon sx={{ mr: 1 }} fontSize="small" />
              Message
            </MenuItem>
            {isMobile && (
              <MenuItem onClick={handleAction('details')}>
                <InfoIcon sx={{ mr: 1 }} fontSize="small" />
                View Details
              </MenuItem>
            )}
            <MenuItem onClick={handleAction('settings')}>
              <SettingsIcon sx={{ mr: 1 }} fontSize="small" />
              Settings
            </MenuItem>
          </Menu>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Chip
            label={agent.status}
            size="small"
            sx={{
              bgcolor: getStatusColor(agent.status),
              color: 'common.white',
            }}
          />
        </Box>

        {agent.currentTask && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Current Task
            </Typography>
            <Typography variant="body2" gutterBottom>
              {agent.currentTask}
            </Typography>
            {agent.progress !== undefined && (
              <LinearProgress
                variant="determinate"
                value={agent.progress}
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const AgentList = ({ agents, isLoading = false, onAction }) => {
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
              onAction={onAction}
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
  }).isRequired,
  onClick: PropTypes.func,
  onAction: PropTypes.func,
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
  onAction: PropTypes.func,
};

export default AgentList;
