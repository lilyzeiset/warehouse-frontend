import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

import Sidebar from './Sidebar';
import TitleBar from './TitleBar';
import Content from './Content';

const drawerWidth = 240;

export default function Dashboard() {
  return (
    <Box sx={{ display: 'flex' }}>
      <TitleBar drawerWidth={drawerWidth} />
      <Sidebar drawerWidth={drawerWidth} />
      <Content />
    </Box>
  );
}