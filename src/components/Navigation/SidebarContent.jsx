import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
  Divider
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as AssignmentIcon,
  Analytics as AnalyticsIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Chat as ChatIcon
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

const MotionListItem = motion.create(ListItem);

const SidebarContent = () => {
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = React.useState('/');

  const handleItemClick = (path) => {
    setSelectedItem(path);
  };

  return (
    <Box sx={{ 
      py: 2,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Logo/Brand */}
      <Box sx={{ px: 3, mb: 4 }}>
        <Typography 
          variant="h6" 
          component={motion.div}
          animate={{
            opacity: [1, 0.8, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          sx={{ 
            color: 'primary.main',
            fontWeight: 'bold',
            letterSpacing: '0.05em'
          }}
        >
          DASHBOARD
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Main Navigation */}
      <List>
        {menuItems.filter(item => item.section === 'main').map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={selectedItem === item.path}
              onClick={() => handleItemClick(item.path)}
              aria-label={item.title}
              sx={{
                borderRadius: 1,
                mx: 1,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(79, 195, 247, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(79, 195, 247, 0.12)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: selectedItem === item.path ? 'primary.main' : 'text.secondary',
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                primaryTypographyProps={{
                  sx: { 
                    color: selectedItem === item.path ? 'primary.main' : 'text.primary',
                    fontWeight: selectedItem === item.path ? 'medium' : 'regular'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Secondary Navigation */}
      <List>
        {menuItems.filter(item => item.section === 'secondary').map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={selectedItem === item.path}
              onClick={() => handleItemClick(item.path)}
              aria-label={item.title}
              sx={{
                borderRadius: 1,
                mx: 1,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(79, 195, 247, 0.08)',
                  '&:hover': {
                    backgroundColor: 'rgba(79, 195, 247, 0.12)',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ 
                color: selectedItem === item.path ? 'primary.main' : 'text.secondary',
                minWidth: 40
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.title}
                primaryTypographyProps={{
                  sx: { 
                    color: selectedItem === item.path ? 'primary.main' : 'text.primary',
                    fontWeight: selectedItem === item.path ? 'medium' : 'regular'
                  }
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
