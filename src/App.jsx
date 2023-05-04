import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';


function App() {
  
  const mdTheme = createTheme();

  return (
    <ThemeProvider theme={mdTheme}>
      <BrowserRouter>
        <CssBaseline />
        <Dashboard />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
