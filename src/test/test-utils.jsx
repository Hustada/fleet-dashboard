import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export function renderWithTheme(ui) {
  return render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {ui}
    </ThemeProvider>
  );
}

// Re-export everything
export * from '@testing-library/react';
