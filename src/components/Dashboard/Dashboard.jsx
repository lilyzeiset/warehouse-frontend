import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import Sidebar from './Sidebar';
import TitleBar from './TitleBar';
import Content from './Content';
import Category from '../Category';
import Item from '../Item';
import Warehouse from '../Warehouse';

const drawerWidth = 240;

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <TitleBar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <Content>
        <Category />
        <Item />
        <Warehouse />
      </Content>
    </Box>
  );
}