import React from 'react';
import {
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Tabs,
  Tab,
  Avatar,
  Chip,
  useTheme,
  Paper,
  Grid,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import { motion } from 'framer-motion';
import {
  Close as CloseIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  Pending as PendingIcon,
  Schedule as ScheduledIcon,
  Edit as WriterIcon,
  Code as CoderIcon,
  Analytics as AnalystIcon,
  Brush as DesignerIcon,
  Psychology as ResearcherIcon,
} from '@mui/icons-material';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    {...other}
  >
    {value === index && (
      <Box sx={{ py: 3 }}>
        {children}
      </Box>
    )}
  </div>
);

const ActivityTimeline = ({ activities }) => {
  const theme = useTheme();

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <SuccessIcon color="success" />;
      case 'failed':
        return <ErrorIcon color="error" />;
      case 'in_progress':
        return <PendingIcon color="warning" />;
      case 'scheduled':
        return <ScheduledIcon color="info" />;
      default:
        return <PendingIcon />;
    }
  };

  return (
    <Timeline
      sx={{
        [`& .MuiTimelineItem-root`]: {
          minHeight: 'auto',
          '&:before': {
            flex: 0,
            padding: 0,
          },
        },
        [`& .MuiTimelineContent-root`]: {
          px: { xs: 1, sm: 2 },
          py: 1,
        },
        [`& .MuiTimelineDot-root`]: {
          margin: 0,
          p: 0.5,
        },
        [`& .MuiTimelineSeparator-root`]: {
          mx: { xs: 1, sm: 2 },
        },
        [`& .MuiTimelineConnector-root`]: {
          width: 2,
        },
      }}
    >
      {activities.map((activity, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot sx={{ bgcolor: 'transparent', boxShadow: 'none', p: 0 }}>
              {getStatusIcon(activity.status)}
            </TimelineDot>
            {index < activities.length - 1 && (
              <TimelineConnector sx={{ bgcolor: 'divider' }} />
            )}
          </TimelineSeparator>
          <TimelineContent>
            <Paper
              sx={{
                p: { xs: 1.5, sm: 2 },
                bgcolor: `${theme.palette.background.paper}`,
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 1,
                mb: { xs: 1, sm: 2 },
                wordBreak: 'break-word'
              }}
            >
              <Typography variant="subtitle2" component="div" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                {activity.task}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
              >
                {activity.timestamp}
              </Typography>
              {activity.details && (
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mt: 1,
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {activity.details}
                </Typography>
              )}
              {activity.metrics && (
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {Object.entries(activity.metrics).map(([key, value]) => (
                    <Chip
                      key={key}
                      label={`${key}: ${value}`}
                      size="small"
                      sx={{ 
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                        height: 'auto',
                        '& .MuiChip-label': {
                          px: 1,
                          py: 0.25
                        }
                      }}
                    />
                  ))}
                </Box>
              )}
            </Paper>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

const AgentDetails = ({ open, onClose, agent }) => {
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Dummy data for demonstration
  const activities = [
    {
      task: 'Completed blog post on AI trends',
      status: 'completed',
      timestamp: '2 hours ago',
      details: 'Generated a 1500-word article with 5 key insights',
      metrics: {
        'Words': '1,500',
        'Time': '45m',
        'Quality': '98%'
      }
    },
    {
      task: 'Analyzing market research data',
      status: 'in_progress',
      timestamp: 'In progress',
      details: 'Processing survey responses and generating insights',
      metrics: {
        'Progress': '65%',
        'ETA': '30m'
      }
    },
    {
      task: 'Social media post generation',
      status: 'scheduled',
      timestamp: 'Scheduled for 2PM',
      details: 'Will create 5 posts based on the latest blog'
    },
    {
      task: 'Email newsletter draft',
      status: 'failed',
      timestamp: '5 hours ago',
      details: 'Failed due to API rate limit. Retrying in 1 hour.'
    }
  ];

  const metrics = {
    'Tasks Completed': '127',
    'Success Rate': '98.5%',
    'Avg. Response Time': '1.2s',
    'Accuracy Score': '99.1%'
  };

  if (!agent) return null;

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: 'background.default',
        }
      }}
    >
      <Box sx={{ 
        position: 'relative',
        bgcolor: 'background.default',
        backgroundImage: `linear-gradient(45deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`
      }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary'
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ p: 3, pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 64,
                height: 64
              }}
            >
              {agent.role === 'Writer' && <WriterIcon />}
              {agent.role === 'Coder' && <CoderIcon />}
              {agent.role === 'Analyst' && <AnalystIcon />}
              {agent.role === 'Designer' && <DesignerIcon />}
              {agent.role === 'Researcher' && <ResearcherIcon />}
            </Avatar>
            <Box>
              <Typography variant="h5" color="text.primary">
                {agent.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {agent.role}
              </Typography>
            </Box>
          </Box>

          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                minWidth: 100,
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main'
                }
              }
            }}
          >
            <Tab label="Activities" />
            <Tab label="Metrics" />
            <Tab label="Settings" />
          </Tabs>
        </Box>

        <DialogContent>
          <TabPanel value={tabValue} index={0}>
            <ActivityTimeline activities={activities} />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              {Object.entries(metrics).map(([key, value]) => (
                <Grid item xs={12} sm={6} key={key}>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: 'background.paper',
                      border: `1px solid ${theme.palette.divider}`
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      {key}
                    </Typography>
                    <Typography variant="h4" color="text.primary" sx={{ mt: 1 }}>
                      {value}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="body1" color="text.secondary">
              Agent settings and configurations will be added here.
            </Typography>
          </TabPanel>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default AgentDetails;
