import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function TitleBar (props) {

  const drawerWidth = props.drawerWidth;

  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          PAGE TITLE
        </Typography>
      </Toolbar>
    </AppBar>
  )
}