import { CssBaseline, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {Provider} from 'react-redux';
import store from './reduxstore.js'

import Sidebar from './components/Dashboard/Sidebar';
import TitleBar from './components/Dashboard/TitleBar';
import Home from './components/Dashboard/Home';
import CreateWarehouse from './components/Warehouse/CreateWarehouse';
import Warehouse from './components/Warehouse/Warehouse';


function App() {
  
  const mdTheme = createTheme({
    palette: {
      primary: {
        main: '#9bbb2b'
      }
    }
  });
  const drawerWidth = 240;

  return (
    <Provider store={store}>
    <ThemeProvider theme={mdTheme}>
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <TitleBar drawerWidth={drawerWidth} />
        <Sidebar drawerWidth={drawerWidth} />
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Toolbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/createWarehouse' element={<CreateWarehouse />} />
            <Route path='/warehouse' element={<Warehouse />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
    </ThemeProvider>
    </Provider>
  )
}

export default App
