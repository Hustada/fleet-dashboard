import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, useTheme, Avatar, Badge, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Close as CloseIcon, Chat as ChatIcon, LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';
import SidebarContent from '../Navigation/SidebarContent';
import ChatPanel from '../Chat/ChatPanel';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeMode } from '../../contexts/ThemeContext';

const DRAWER_WIDTH = 280;
const CHAT_WIDTH = 320;
const APPBAR_HEIGHT = 64;
const FOOTER_HEIGHT = { mobile: 120, desktop: 60 };

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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { sm: DRAWER_WIDTH },
          flexShrink: { sm: 0 },
        }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
            disableRestoreFocus: true,
            BackdropProps: {
              style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
              invisible: false,
              transitionDuration: 0
            }
          }}
          transitionDuration={0}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: { xs: '100%', sm: DRAWER_WIDTH },
              bgcolor: 'background.paper',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
            '& .MuiBackdrop-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }
          }}
        >
          <SidebarContent onMobileClose={handleDrawerToggle} />
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              bgcolor: 'background.paper',
              borderRight: `1px solid ${theme.palette.divider}`,
            },
          }}
          open
        >
          <SidebarContent />
        </Drawer>
      </Box>

      {/* Main content */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        flexGrow: 1,
        minHeight: '100vh',
        width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` }
      }}>
        {/* App Bar */}
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { sm: `${DRAWER_WIDTH}px` },
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
          elevation={0}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2, 
                display: { sm: 'none' },
                color: theme.palette.mode === 'light' ? 'primary.main' : 'inherit',
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}
              disableRipple
              TouchRippleProps={{ style: { display: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton 
                onClick={toggleTheme}
                sx={{ 
                  color: theme.palette.mode === 'light' ? 'primary.main' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                }}
                disableRipple
                TouchRippleProps={{ style: { display: 'none' } }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <Badge badgeContent={4} color="error">
                <IconButton 
                  sx={{ 
                    color: theme.palette.mode === 'light' ? 'primary.main' : 'inherit',
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                  disableRipple
                  TouchRippleProps={{ style: { display: 'none' } }}
                >
                  <NotificationsIcon />
                </IconButton>
              </Badge>
              <IconButton 
                onClick={handleChatToggle}
                sx={{ 
                  color: theme.palette.mode === 'light' ? 'primary.main' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'transparent'
                  }
                }}
                disableRipple
                TouchRippleProps={{ style: { display: 'none' } }}
              >
                <ChatIcon />
              </IconButton>
              <Avatar
                alt="User"
                src="/path/to/user-image.jpg"
                sx={{ width: 32, height: 32 }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            mt: `${APPBAR_HEIGHT}px`,
            mb: { xs: `${FOOTER_HEIGHT.mobile}px`, sm: `${FOOTER_HEIGHT.desktop}px` },
            minHeight: {
              xs: `calc(100vh - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT.mobile}px)`,
              sm: `calc(100vh - ${APPBAR_HEIGHT}px - ${FOOTER_HEIGHT.desktop}px)`
            },
            overflow: 'auto'
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        <Footer />

        {/* Chat Panel */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ x: CHAT_WIDTH }}
              animate={{ x: 0 }}
              exit={{ x: CHAT_WIDTH }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: CHAT_WIDTH,
                height: '100%',
                zIndex: theme.zIndex.drawer + 2,
              }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default MainLayout;
