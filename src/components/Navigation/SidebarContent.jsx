import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
  Divider,
  IconButton
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Chat as ChatIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const menuItems = [
  { 
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/',
    section: 'main'
  },
  { 
    title: 'Projects',
    icon: <AssignmentIcon />,
    path: '/projects',
    section: 'main'
  },
  { 
    title: 'Analytics',
    icon: <AnalyticsIcon />,
    path: '/analytics',
    section: 'main'
  },
  { 
    title: 'Team',
    icon: <PeopleIcon />,
    path: '/team',
    section: 'secondary'
  },
  { 
    title: 'Messages',
    icon: <ChatIcon />,
    path: '/messages',
    section: 'secondary'
  },
  { 
    title: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings',
    section: 'secondary'
  }
];

const SidebarContent = ({ onMobileClose }) => {
  const theme = useTheme();
  const location = useLocation();

  const renderMenuSection = (section) => {
    return menuItems
      .filter(item => item.section === section)
      .map((item) => (
        <ListItem 
          key={item.title} 
          disablePadding 
          sx={{ display: 'block' }}
          component={Link}
          to={item.path}
        >
          <ListItemButton
            selected={location.pathname === item.path}
            sx={{
              minHeight: 48,
              px: 2.5,
              borderRadius: 1,
              mx: 1,
              '&.Mui-selected': {
                backgroundColor: 'rgba(79, 195, 247, 0.08)',
                '&:hover': {
                  backgroundColor: 'rgba(79, 195, 247, 0.12)',
                },
              }
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: location.pathname === item.path ? 'primary.main' : 'text.secondary'
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.title}
              primaryTypographyProps={{
                sx: { 
                  color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                  fontWeight: location.pathname === item.path ? 'medium' : 'regular'
                }
              }}
            />
          </ListItemButton>
        </ListItem>
      ));
  };

  const handleDrawerToggle = () => {
    // Add your logic here to handle the drawer toggle
  };

  return (
    <Box sx={{ 
      py: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ 
        px: 3, 
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              letterSpacing: '0.05em'
            }}
          >
            DASHBOARD
          </Typography>
        </motion.div>
        <IconButton 
          onClick={onMobileClose} 
          sx={{ 
            display: { xs: 'block', sm: 'none' },
            color: 'text.secondary',
            '&:hover': {
              backgroundColor: 'transparent'
            }
          }}
          disableRipple
          TouchRippleProps={{ style: { display: 'none' } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <List component="nav" sx={{ px: 2 }}>
        {renderMenuSection('main')}
      </List>

      <Divider sx={{ my: 2 }} />

      <List component="nav" sx={{ px: 2 }}>
        {renderMenuSection('secondary')}
      </List>
    </Box>
  );
};

export default SidebarContent;
