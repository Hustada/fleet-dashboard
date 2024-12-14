import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode: mode,
    primary: mode === 'light'
      ? {
          main: '#2196F3',
          light: '#64B5F6',
          dark: '#1976D2',
        }
      : {
          main: '#4FC3F7',
          light: '#84D5F9',
          dark: '#2B98C7',
        },
    secondary: mode === 'light'
      ? {
          main: '#FF4081',
          light: '#FF80AB',
          dark: '#F50057',
        }
      : {
          main: '#FF4081',
          light: '#FF679D',
          dark: '#C60055',
        },
    background: mode === 'light'
      ? {
          default: '#F5F5F5',
          paper: '#FFFFFF',
          darker: '#EEEEEE',
        }
      : {
          default: '#0A1929',
          paper: '#132F4C',
          darker: '#051E34',
        },
    text: mode === 'light'
      ? {
          primary: 'rgba(0, 0, 0, 0.87)',
          secondary: 'rgba(0, 0, 0, 0.6)',
        }
      : {
          primary: '#fff',
          secondary: 'rgba(255, 255, 255, 0.7)',
        },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: mode === 'light' ? "#909090 #f5f5f5" : "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: mode === 'light' ? "#f5f5f5" : "#2b2b2b",
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: mode === 'light' ? "#909090" : "#6b6b6b",
            minHeight: 24,
            border: `2px solid ${mode === 'light' ? "#f5f5f5" : "#2b2b2b"}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'light' ? '#FFFFFF' : '#132F4C',
          borderRight: '1px solid',
          borderColor: mode === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: mode === 'light' 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)'
            : 'linear-gradient(135deg, rgba(19, 47, 76, 0.9) 0%, rgba(19, 47, 76, 0.6) 100%)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'none',
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  spacing: 8,
});

export default getTheme;
