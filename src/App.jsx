import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from './theme'
import MainLayout from './components/Layout/MainLayout'
import ResponsiveLayout from './components/ResponsiveLayout'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainLayout>
        <ResponsiveLayout />
      </MainLayout>
    </ThemeProvider>
  )
}

export default App
