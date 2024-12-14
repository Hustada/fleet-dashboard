import React from 'react';
import { Box, Grid, Paper, Typography, IconButton, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import {
  SmartToy as AgentIcon,
  Psychology as ThinkingIcon,
  Task as TaskIcon,
  Memory as ProcessingIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, color }) => {
  const theme = useTheme();
  
  return (
    <Paper
      component={motion.div}
      whileHover={{ y: -5, boxShadow: theme.shadows[8] }}
      transition={{ duration: 0.2 }}
      sx={{
        p: 3,
        height: '100%',
        background: `linear-gradient(45deg, ${color}22, ${color}11)`,
        border: `1px solid ${color}33`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        component={motion.div}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        sx={{
          position: 'absolute',
          right: -20,
          top: -20,
          color: color
        }}
      >
        {icon}
      </Box>
      
      <Typography variant="h6" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" sx={{ color: color, fontWeight: 'bold' }}>
        {value}
      </Typography>
    </Paper>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  
  const stats = [
    {
      title: 'Active Agents',
      value: '6',
      icon: <AgentIcon sx={{ fontSize: 100 }} />,
      color: theme.palette.primary.main
    },
    {
      title: 'Tasks in Queue',
      value: '12',
      icon: <TaskIcon sx={{ fontSize: 100 }} />,
      color: theme.palette.warning.main
    },
    {
      title: 'Processing',
      value: '3',
      icon: <ProcessingIcon sx={{ fontSize: 100 }} />,
      color: theme.palette.info.main
    },
    {
      title: 'Completed Today',
      value: '28',
      icon: <ThinkingIcon sx={{ fontSize: 100 }} />,
      color: theme.palette.success.main
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
        AI Agents Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={3} 
            key={stat.title}
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Next we'll add:
          - Agent status list showing each agent's current task
          - Task queue timeline
          - Agent performance metrics */}
    </Box>
  );
};

export default Dashboard;
