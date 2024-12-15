import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, LinearProgress, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';

const MotionPaper = motion(Paper);
const MotionTypography = motion(Typography);

const Analytics = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    agentPerformance: [],
    taskDistribution: [],
    weeklyTrends: [],
    topAgents: []
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setData({
          agentPerformance: [
            { name: 'Content Writer', tasks: 156, success: 94, responseTime: 1.2 },
            { name: 'Code Assistant', tasks: 203, success: 96, responseTime: 0.8 },
            { name: 'Data Analyst', tasks: 178, success: 92, responseTime: 1.5 },
            { name: 'UI Designer', tasks: 145, success: 95, responseTime: 1.1 },
            { name: 'Research Agent', tasks: 167, success: 93, responseTime: 1.3 }
          ],
          taskDistribution: [
            { name: 'Content Creation', value: 35 },
            { name: 'Code Generation', value: 25 },
            { name: 'Data Analysis', value: 20 },
            { name: 'UI/UX Design', value: 15 },
            { name: 'Research', value: 5 }
          ],
          weeklyTrends: [
            { day: 'Mon', tasks: 45, completion: 42 },
            { day: 'Tue', tasks: 52, completion: 48 },
            { day: 'Wed', tasks: 48, completion: 45 },
            { day: 'Thu', tasks: 61, completion: 55 },
            { day: 'Fri', tasks: 55, completion: 51 },
            { day: 'Sat', tasks: 32, completion: 30 },
            { day: 'Sun', tasks: 28, completion: 26 }
          ],
          topAgents: [
            { name: 'Code Assistant', score: 96 },
            { name: 'UI Designer', score: 95 },
            { name: 'Content Writer', score: 94 },
            { name: 'Research Agent', score: 93 },
            { name: 'Data Analyst', score: 92 }
          ]
        });
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main
  ];

  const renderPerformanceChart = () => (
    <MotionPaper
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      sx={{ 
        p: 3,
        height: '100%',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Weekly Task Trends
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data.weeklyTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="tasks" 
              stroke={theme.palette.primary.main} 
              name="Tasks Assigned"
            />
            <Line 
              type="monotone" 
              dataKey="completion" 
              stroke={theme.palette.success.main} 
              name="Tasks Completed"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </MotionPaper>
  );

  const renderTaskDistribution = () => (
    <MotionPaper
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      sx={{ 
        p: 3,
        height: '100%',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Task Distribution
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={data.taskDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.taskDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </MotionPaper>
  );

  const renderTopAgents = () => (
    <MotionPaper
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      sx={{ p: 3, height: '100%', minHeight: 400 }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Top Performing Agents
      </Typography>
      {data.topAgents.map((agent, index) => (
        <Box key={agent.name} sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {agent.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {agent.score}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={agent.score}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: `${COLORS[index % COLORS.length]}22`,
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: COLORS[index % COLORS.length]
              }
            }}
          />
        </Box>
      ))}
    </MotionPaper>
  );

  const renderAgentMetrics = () => (
    <MotionPaper
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
      sx={{ p: 3, height: '100%', minHeight: 400 }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Agent Performance Metrics
      </Typography>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data.agentPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar 
              dataKey="tasks" 
              fill={theme.palette.primary.main} 
              name="Total Tasks"
            />
            <Bar 
              dataKey="success" 
              fill={theme.palette.success.main} 
              name="Success Rate (%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </MotionPaper>
  );

  return (
    <Box sx={{ py: 3 }}>
      <MotionTypography 
        variant="h4"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          background: theme => `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Analytics Dashboard
      </MotionTypography>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          {renderPerformanceChart()}
        </Grid>
        <Grid item xs={12} lg={4}>
          {renderTaskDistribution()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderTopAgents()}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderAgentMetrics()}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
