import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Grid,
  Divider,
  useTheme,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import DescriptionIcon from '@mui/icons-material/Description';
import TimelineIcon from '@mui/icons-material/Timeline';
import { motion } from 'framer-motion';

const ProjectDetailsModal = ({ open, onClose, project }) => {
  const theme = useTheme();

  if (!project) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return theme.palette.success.main;
      case 'In Progress':
        return theme.palette.warning.main;
      case 'Planning':
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  // Mock data for project details
  const projectDetails = {
    tasks: [
      { id: 1, name: 'Research market trends', status: 'Completed', assignee: 'Research Officer' },
      { id: 2, name: 'Draft initial content', status: 'In Progress', assignee: 'Content Officer' },
      { id: 3, name: 'Review analytics', status: 'Pending', assignee: 'Intelligence Officer' },
    ],
    metrics: {
      contentPieces: 12,
      engagement: '85%',
      completionRate: '60%',
      timeSpent: '24h'
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperComponent={motion.div}
      PaperProps={{
        initial: { y: -20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.2 },
        style: { 
          borderRadius: '12px',
          backgroundColor: theme.palette.background.paper,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6" component="div">
          {project.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Chip
            label={project.status}
            size="small"
            sx={{
              backgroundColor: `${getStatusColor(project.status)}15`,
              color: getStatusColor(project.status),
              fontWeight: 'medium',
            }}
          />
          <IconButton edge="end" onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Project Overview */}
          <Grid item xs={12}>
            <Box sx={{ 
              mb: 3,
              textAlign: 'center',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: '30%',
                height: '1px',
                backgroundColor: theme.palette.divider,
              },
              '&::before': {
                left: 0,
              },
              '&::after': {
                right: 0,
              }
            }}>
              <Typography 
                variant="h6" 
                color="primary" 
                sx={{ 
                  display: 'inline-block',
                  px: 2,
                  backgroundColor: theme.palette.background.paper,
                  position: 'relative',
                }}
              >
                Overview
              </Typography>
            </Box>
            <Typography variant="body1" align="center">
              {project.description}
            </Typography>
          </Grid>

          {/* Key Metrics */}
          <Grid item xs={12}>
            <Box sx={{ 
              mb: 3,
              textAlign: 'center',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: '30%',
                height: '1px',
                backgroundColor: theme.palette.divider,
              },
              '&::before': {
                left: 0,
              },
              '&::after': {
                right: 0,
              }
            }}>
              <Typography 
                variant="h6" 
                color="primary"
                sx={{ 
                  display: 'inline-block',
                  px: 2,
                  backgroundColor: theme.palette.background.paper,
                  position: 'relative',
                }}
              >
                Key Metrics
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: theme.palette.background.default,
                  borderRadius: 1,
                  textAlign: 'center'
                }}>
                  <Typography variant="h6">{projectDetails.metrics.contentPieces}</Typography>
                  <Typography variant="body2" color="textSecondary">Content Pieces</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: theme.palette.background.default,
                  borderRadius: 1,
                  textAlign: 'center'
                }}>
                  <Typography variant="h6">{projectDetails.metrics.engagement}</Typography>
                  <Typography variant="body2" color="textSecondary">Engagement</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: theme.palette.background.default,
                  borderRadius: 1,
                  textAlign: 'center'
                }}>
                  <Typography variant="h6">{projectDetails.metrics.completionRate}</Typography>
                  <Typography variant="body2" color="textSecondary">Completion</Typography>
                </Box>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Box sx={{ 
                  p: 2, 
                  bgcolor: theme.palette.background.default,
                  borderRadius: 1,
                  textAlign: 'center'
                }}>
                  <Typography variant="h6">{projectDetails.metrics.timeSpent}</Typography>
                  <Typography variant="body2" color="textSecondary">Time Spent</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Tasks */}
          <Grid item xs={12}>
            <Box sx={{ 
              mb: 3,
              textAlign: 'center',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: '30%',
                height: '1px',
                backgroundColor: theme.palette.divider,
              },
              '&::before': {
                left: 0,
              },
              '&::after': {
                right: 0,
              }
            }}>
              <Typography 
                variant="h6" 
                color="primary"
                sx={{ 
                  display: 'inline-block',
                  px: 2,
                  backgroundColor: theme.palette.background.paper,
                  position: 'relative',
                }}
              >
                Current Tasks
              </Typography>
            </Box>
            <Box sx={{ 
              bgcolor: theme.palette.background.default,
              borderRadius: 1,
              overflow: 'hidden'
            }}>
              {projectDetails.tasks.map((task, index) => (
                <Box
                  key={task.id}
                  sx={{
                    p: 2,
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr',
                    alignItems: 'center',
                    gap: 2,
                    borderBottom: 
                      index !== projectDetails.tasks.length - 1 
                        ? `1px solid ${theme.palette.divider}`
                        : 'none',
                  }}
                >
                  <Typography variant="body1">{task.name}</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Chip
                      label={task.status}
                      size="small"
                      sx={{
                        backgroundColor: 
                          task.status === 'Completed' 
                            ? `${theme.palette.success.main}15`
                            : task.status === 'In Progress'
                            ? `${theme.palette.warning.main}15`
                            : `${theme.palette.grey[500]}15`,
                        color:
                          task.status === 'Completed'
                            ? theme.palette.success.main
                            : task.status === 'In Progress'
                            ? theme.palette.warning.main
                            : theme.palette.grey[500],
                      }}
                    />
                  </Box>
                  <Typography 
                    variant="body2" 
                    color="textSecondary"
                    sx={{ textAlign: 'center' }}
                  >
                    {task.assignee}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Team Members */}
          <Grid item xs={12}>
            <Box sx={{ 
              mb: 3,
              textAlign: 'center',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                width: '30%',
                height: '1px',
                backgroundColor: theme.palette.divider,
              },
              '&::before': {
                left: 0,
              },
              '&::after': {
                right: 0,
              }
            }}>
              <Typography 
                variant="h6" 
                color="primary"
                sx={{ 
                  display: 'inline-block',
                  px: 2,
                  backgroundColor: theme.palette.background.paper,
                  position: 'relative',
                }}
              >
                Assigned Agents
              </Typography>
            </Box>
            <Box sx={{ 
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap'
            }}>
              {Array.from({ length: project.members }).map((_, index) => (
                <Chip
                  key={index}
                  avatar={<Avatar>{index + 1}</Avatar>}
                  label={`Agent ${index + 1}`}
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailsModal;
