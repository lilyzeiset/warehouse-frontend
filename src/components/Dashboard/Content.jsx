import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import {BrowserRouter, Routes, Route } from 'react-router-dom';

import Category from '../Category';
import Item from '../Item';
import Warehouse from '../Warehouse/Warehouse';
import CreateWarehouse from '../Warehouse/CreateWarehouse';

export default function Content(props) {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      <Toolbar />
      <Routes>
        <Route path='/' element={<CreateWarehouse />} />
        <Route path='/i' element={<Item />} />
        <Route path='/warehouse' element={<Warehouse />} />
      </Routes>
    </Box>
  )
}