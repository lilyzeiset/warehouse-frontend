import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';

import { useNavigate, useLocation } from 'react-router-dom';

import { useFindAllWarehousesQuery } from '../../api/warehouseApi';
import { useFindAllCategoriesQuery } from '../../api/categoryApi';
import { useEffect } from 'react';

export default function Sidebar(props) {

  const drawerWidth = props.drawerWidth;

  const {
    data: allWarehouses, 
    refetch: refetchAllWarehouses
  } = useFindAllWarehousesQuery();


  const navigate = useNavigate();
  const location = useLocation();

  //refetch data when location.state.refetch is changed
  useEffect(() => {
    refetchAllWarehouses();
  }, [location.state?.refetch]);

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/', {state: {...location.state}})}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>

      </Toolbar>
      <Divider />
      <List>
        <ListItem>
          Warehouses
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/createWarehouse/')}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary='Create Warehouse' />
          </ListItemButton>
        </ListItem>
        {allWarehouses?.map((warehouse) => (
          <ListItem key={warehouse.id} disablePadding>
            <ListItemButton onClick={() => navigate('/warehouse/', {state: {warehouseId: warehouse.id}})}>
              <ListItemIcon>
                <WarehouseIcon />
              </ListItemIcon>
              <ListItemText primary={warehouse.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </Drawer>
  )
}