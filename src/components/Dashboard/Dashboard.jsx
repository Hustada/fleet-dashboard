import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography, Skeleton, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import {
  SmartToy as AgentIcon,
  Psychology as ThinkingIcon,
  Task as TaskIcon,
  Memory as ProcessingIcon,
} from '@mui/icons-material';
import AgentList from '../Agents/AgentList';

const StatCard = ({ title, value, icon, color, isLoading }) => {
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
      {isLoading ? (
        <Skeleton variant="text" width="60%" height={48} />
      ) : (
        <Typography variant="h4" component="div" sx={{ color: color, fontWeight: 'bold' }}>
          {value}
        </Typography>
      )}
    </Paper>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    activeAgents: 0,
    tasksInQueue: 0,
    processing: 0,
    completedToday: 0
  });
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setStats({
          activeAgents: 5,
          tasksInQueue: 12,
          processing: 3,
          completedToday: 28
        });
        
        setAgents([
          {
            id: '1',
            name: 'Content Writer',
            role: 'Writer',
            status: 'Active',
            currentTask: 'Writing blog post about AI trends',
            progress: 65,
            tasksCompleted: 8,
            activities: [
              {
                task: 'Writing blog post about AI trends',
                status: 'in_progress',
                timestamp: '2 hours ago',
                details: 'Researching latest developments in AI',
                metrics: { words: 1200, sources: 5 }
              },
              {
                task: 'Completed SEO optimization',
                status: 'completed',
                timestamp: '4 hours ago',
                metrics: { score: 92 }
              }
            ]
          },
          {
            id: '2',
            name: 'Code Assistant',
            role: 'Coder',
            status: 'Busy',
            currentTask: 'Reviewing pull request #42',
            progress: 30,
            tasksCompleted: 12,
            activities: [
              {
                task: 'Code Review',
                status: 'in_progress',
                timestamp: '1 hour ago',
                details: 'Reviewing pull request #42',
                metrics: { files: 5, comments: 3 }
              }
            ]
          },
          {
            id: '3',
            name: 'Data Analyst',
            role: 'Analyst',
            status: 'Idle',
            currentTask: null,
            progress: 0,
            tasksCompleted: 5,
            activities: []
          },
          {
            id: '4',
            name: 'UI Designer',
            role: 'Designer',
            status: 'Active',
            currentTask: 'Creating new component library',
            progress: 85,
            tasksCompleted: 6,
            activities: [
              {
                task: 'Component Library Design',
                status: 'in_progress',
                timestamp: '3 hours ago',
                details: 'Creating new design system components',
                metrics: { components: 15, completed: 12 }
              }
            ]
          },
          {
            id: '5',
            name: 'Research Agent',
            role: 'Researcher',
            status: 'Active',
            currentTask: 'Analyzing market trends',
            progress: 45,
            tasksCompleted: 7,
            activities: [
              {
                task: 'Market Analysis',
                status: 'in_progress',
                timestamp: '1 hour ago',
                details: 'Analyzing competitor strategies',
                metrics: { companies: 8, insights: 12 }
              }
            ]
          }
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const statsConfig = [
    {
      title: 'Active Agents',
      value: stats.activeAgents,
      icon: <AgentIcon sx={{ fontSize: 100 }} />,
      color: theme.palette.primary.main
    },
    {
      title: 'Tasks in Queue',
      value: stats.tasksInQueue,
      icon: <TaskIcon sx={{ fontSize: 100 }} />,
      color: theme.palette.warning.main
    },
    {
      title: 'Processing',
      value: stats.processing,
      icon: <ProcessingIcon sx={{ fontSize: 100 }} />,
      color: theme.palette.info.main
    },
    {
      title: 'Completed Today',
      value: stats.completedToday,
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
        {statsConfig.map((stat, index) => (
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
            <StatCard {...stat} isLoading={isLoading} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <AgentList agents={agents} isLoading={isLoading} />
      </Box>
    </Box>
  );
};

export default Dashboard;
