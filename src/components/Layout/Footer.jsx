import React from 'react';
import { Box, Typography, Link, Divider, useTheme, useMediaQuery } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        right: 0,
        width: { xs: '100%', sm: `calc(100% - 280px)` },
        height: { xs: 'auto', sm: 60 },
        bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
        borderTop: `1px solid ${theme.palette.divider}`,
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'space-between' },
          gap: { xs: 1, sm: 0 },
          py: { xs: 2, sm: 0 },
          px: 3,
        }}
      >
        {/* Status and Links */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 4 },
            textAlign: 'center',
            order: { xs: 1, sm: 2 }
          }}
        >
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center', 
              gap: 1 
            }}
          >
            Active Agents: <Typography component="span" color="primary.main" fontWeight="600">12</Typography>
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
          >
            System Status: <Typography component="span" color="success.main" fontWeight="600">Healthy</Typography>
          </Typography>
          <Link
            href="https://github.com/hustada/fleet-dashboard"
            target="_blank"
            rel="noopener"
            sx={{
              color: 'text.secondary',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textDecoration: 'none',
              transition: 'color 0.2s',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <GitHubIcon fontSize="small" />
            <Typography variant="body2">GitHub</Typography>
          </Link>
        </Box>

        {/* Copyright and Version */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            textAlign: 'center',
            order: { xs: 2, sm: 1 }
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {currentYear} Fleet Dashboard
          </Typography>
          <Divider orientation={isMobile ? 'horizontal' : 'vertical'} flexItem sx={{ display: { xs: 'none', sm: 'block' } }} />
          <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>
            Version 1.0.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
