import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

export default function Content(props) {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
    >
      <Toolbar />
      {props.children}
    </Box>
  )
}