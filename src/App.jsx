import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  
  const mdTheme = createTheme();

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Dashboard />
    </ThemeProvider>
  )
}

export default App
