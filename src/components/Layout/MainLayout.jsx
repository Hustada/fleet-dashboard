import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, useTheme, Avatar, Badge, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Close as CloseIcon, Chat as ChatIcon, LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';
import SidebarContent from '../Navigation/SidebarContent';
import ChatPanel from '../Chat/ChatPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../../contexts/ThemeContext';

const DRAWER_WIDTH = 280;
const CHAT_WIDTH = 320;
const APPBAR_HEIGHT = 64;

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);
  const { mode, toggleTheme } = useThemeMode();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  const drawer = <SidebarContent />;

  const MobileDrawer = () => (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleDrawerToggle}
            aria-label="close drawer"
            role="presentation"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'black',
              zIndex: theme.zIndex.drawer - 1
            }}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: theme.palette.background.darker,
              zIndex: theme.zIndex.drawer,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ 
              position: 'sticky',
              top: 0,
              display: 'flex', 
              justifyContent: 'flex-end',
              p: 1,
              bgcolor: 'background.darker',
              borderBottom: `1px solid ${theme.palette.divider}`,
              zIndex: 1
            }}>
              <IconButton 
                onClick={handleDrawerToggle}
                sx={{ color: 'text.secondary' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
              {drawer}
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { sm: `${DRAWER_WIDTH}px` },
          bgcolor: 'background.paper',
          backgroundImage: `linear-gradient(to right, ${theme.palette.background.paper}, ${theme.palette.background.darker})`,
          color: mode === 'light' ? 'primary.main' : 'common.white',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2, 
              display: { sm: 'none' },
              color: mode === 'light' ? 'primary.main' : 'inherit',
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography 
              variant="h6" 
              noWrap 
              component="div"
              sx={{ color: mode === 'light' ? 'primary.main' : 'inherit' }}
            >
              Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              aria-label="toggle theme"
              onClick={toggleTheme}
              sx={{ 
                mr: 1,
                color: mode === 'light' ? 'primary.main' : 'inherit',
              }}
            >
              {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <IconButton
              aria-label="toggle chat"
              onClick={handleChatToggle}
              sx={{ 
                mr: 1,
                color: mode === 'light' ? 'primary.main' : 'inherit',
              }}
              data-testid="chat-toggle"
            >
              <ChatIcon data-testid="chat-button" />
            </IconButton>
            <IconButton 
              sx={{ 
                color: mode === 'light' ? 'primary.main' : 'inherit',
              }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                bgcolor: 'primary.main',
                cursor: 'pointer'
              }}
            >
              M
            </Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer with animation */}
        {isMobile ? (
          <MobileDrawer />
        ) : (
          /* Desktop drawer */
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                bgcolor: 'background.darker',
                borderRight: `1px solid ${theme.palette.divider}`,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        )}
      </Box>

      {/* Chat Panel */}
      <ChatPanel
        open={chatOpen}
        onClose={handleChatToggle}
        agents={[
          {
            id: '1',
            name: 'Content Writer',
            role: 'Writer'
          },
          {
            id: '2',
            name: 'Code Assistant',
            role: 'Coder'
          },
          {
            id: '3',
            name: 'Data Analyst',
            role: 'Analyst'
          },
          {
            id: '4',
            name: 'UI Designer',
            role: 'Designer'
          },
          {
            id: '5',
            name: 'Research Agent',
            role: 'Researcher'
          }
        ]}
      />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
          minHeight: '100vh',
          bgcolor: 'background.default',
          mt: `${APPBAR_HEIGHT}px`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
