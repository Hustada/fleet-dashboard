import React from 'react';
import PropTypes from 'prop-types';
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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Slider,
  Divider,
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

ActivityTimeline.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      details: PropTypes.string,
      metrics: PropTypes.object,
    })
  ).isRequired,
};

const SettingsPanel = () => {
  const theme = useTheme();
  const [model, setModel] = React.useState('gpt-4');
  const [temperature, setTemperature] = React.useState(0.7);
  const [maxTokens, setMaxTokens] = React.useState(2000);
  const [notifications, setNotifications] = React.useState(true);
  const [autoSave, setAutoSave] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Model Configuration
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="model-label">Model</InputLabel>
                  <Select
                    labelId="model-label"
                    id="model-select"
                    value={model}
                    label="Model"
                    onChange={(e) => setModel(e.target.value)}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: 'background.paper',
                          backgroundImage: 'none',
                        },
                      },
                    }}
                  >
                    <MenuItem value="gpt-4">GPT-4</MenuItem>
                    <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                    <MenuItem value="claude-2">Claude 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="max-tokens-label">Max Tokens</InputLabel>
                  <Select
                    labelId="max-tokens-label"
                    id="max-tokens-select"
                    value={maxTokens}
                    label="Max Tokens"
                    onChange={(e) => setMaxTokens(e.target.value)}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          bgcolor: 'background.paper',
                          backgroundImage: 'none',
                        },
                      },
                    }}
                  >
                    <MenuItem value={1000}>1000</MenuItem>
                    <MenuItem value={2000}>2000</MenuItem>
                    <MenuItem value={4000}>4000</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography gutterBottom>Temperature: {temperature}</Typography>
                <Slider
                  value={temperature}
                  onChange={(e, newValue) => setTemperature(newValue)}
                  min={0}
                  max={1}
                  step={0.1}
                  marks
                  valueLabelDisplay="auto"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Task Preferences
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Default System Prompt"
                  multiline
                  rows={3}
                  defaultValue="You are a helpful AI assistant..."
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                    />
                  }
                  label="Auto-save responses"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Notifications
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                    />
                  }
                  label="Enable notifications"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                  }
                  label="Email notifications"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            API Configuration
          </Typography>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="API Key"
                  type="password"
                  defaultValue="sk-..."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="API Endpoint"
                  defaultValue="https://api.openai.com/v1"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
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
            <SettingsPanel />
          </TabPanel>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

AgentDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  agent: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    currentTask: PropTypes.string,
    progress: PropTypes.number,
    tasksCompleted: PropTypes.number,
    activities: PropTypes.array.isRequired,
    metrics: PropTypes.object,
  }).isRequired,
};

export default AgentDetails;
