import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton, Drawer, useTheme, Avatar, Badge, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, Notifications as NotificationsIcon, Close as CloseIcon } from '@mui/icons-material';
import SidebarContent from '../Navigation/SidebarContent';
import { motion, AnimatePresence } from 'framer-motion';

const DRAWER_WIDTH = 280;
const APPBAR_HEIGHT = 64;

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = <SidebarContent />;

  const MobileDrawer = () => (
    <AnimatePresence>
      {mobileOpen && (
        <>
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={handleDrawerToggle}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'black',
              zIndex: 9998
            }}
          />
          <Box
            component={motion.div}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              overflowY: 'auto',
              bgcolor: 'background.darker',
              zIndex: 9999,
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
          </Box>
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
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit">
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
