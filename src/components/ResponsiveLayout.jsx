import React from 'react';
import { Box, Grid, Paper, Typography, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const dummyData = [
  { 
    title: 'Mission Alpha',
    priority: 'high',
    progress: 80,
    description: 'Critical mission requiring immediate attention'
  },
  { 
    title: 'Mission Beta',
    priority: 'medium',
    progress: 60,
    description: 'Standard operation procedures'
  },
  { 
    title: 'Mission Gamma',
    priority: 'low',
    progress: 40,
    description: 'Routine maintenance and updates'
  },
  { 
    title: 'Mission Delta',
    priority: 'high',
    progress: 90,
    description: 'High-priority task in progress'
  },
  { 
    title: 'Mission Epsilon',
    priority: 'medium',
    progress: 30,
    description: 'Ongoing development phase'
  },
  { 
    title: 'Mission Zeta',
    priority: 'low',
    progress: 20,
    description: 'Initial planning phase'
  },
];

const ResponsiveLayout = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4,
          color: 'primary.main',
          fontWeight: 'medium',
        }}
      >
        Mission Control
      </Typography>

      <Grid container spacing={3}>
        {dummyData.map((mission, index) => (
          <Grid item xs={12} sm={6} lg={4} key={index}>
            <Paper
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              elevation={3}
              sx={{
                p: 3,
                height: '100%',
                background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, rgba(19, 47, 76, 0.4) 100%)`,
                backdropFilter: 'blur(10px)',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 'medium' }}>
                  {mission.title}
                </Typography>
                <Chip 
                  size="small"
                  label={mission.priority}
                  color={mission.priority === 'high' ? 'error' : mission.priority === 'medium' ? 'warning' : 'success'}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>

              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, flexGrow: 1 }}>
                {mission.description}
              </Typography>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Progress
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'primary.main' }}>
                    {mission.progress}%
                  </Typography>
                </Box>
                <Box 
                  sx={{ 
                    height: 6,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    overflow: 'hidden'
                  }}
                >
                  <Box
                    component={motion.div}
                    initial={{ width: 0 }}
                    animate={{ width: `${mission.progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    sx={{
                      height: '100%',
                      bgcolor: 'primary.main',
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResponsiveLayout;
