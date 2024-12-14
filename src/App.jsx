import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import getTheme from './theme';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './components/Dashboard/Dashboard';
import { ThemeProvider, useThemeMode } from './contexts/ThemeContext';

const ThemedApp = () => {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <Dashboard />
      </MainLayout>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ThemedApp />
    </ThemeProvider>
  );
}

export default App;
