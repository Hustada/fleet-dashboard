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
  const [selectedSection, setSelectedSection] = React.useState('main');

  const handleNavigation = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      bgcolor: 'background.darker',
    }}>
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="Logo"
            sx={{ width: 40, height: 40 }}
          />
        </motion.div>
        <Typography variant="h6" color="primary" sx={{ flexGrow: 1 }}>
          Content Fleet
        </Typography>
      </Box>

      <List sx={{ flexGrow: 1, px: 2 }}>
        {menuItems.filter(item => item.section === selectedSection).map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={handleNavigation}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.dark',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  },
                },
                '&:hover': {
                  bgcolor: `${theme.palette.primary.main}20`,
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path 
                  ? 'primary.contrastText' 
                  : 'text.secondary',
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title} 
                sx={{ 
                  color: location.pathname === item.path 
                    ? 'primary.contrastText' 
                    : 'text.primary' 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <List sx={{ px: 2 }}>
        {menuItems.filter(item => item.section === 'secondary').map((item, index) => (
          <ListItem key={item.title} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              onClick={handleNavigation}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.dark',
                  '&:hover': {
                    bgcolor: 'primary.main',
                  },
                },
                '&:hover': {
                  bgcolor: `${theme.palette.primary.main}20`,
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: location.pathname === item.path 
                  ? 'primary.contrastText' 
                  : 'text.secondary',
                minWidth: 40 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                sx={{ 
                  color: location.pathname === item.path 
                    ? 'primary.contrastText' 
                    : 'text.primary' 
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SidebarContent;
