import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import CategoryIcon from '@mui/icons-material/Category';
import StarIcon from '@mui/icons-material/Star';
import HomeIcon from '@mui/icons-material/Home';

import { useFindAllWarehousesQuery } from '../../api/warehouseApi';
import { useFindAllCategoriesQuery } from '../../api/categoryApi';

export default function Sidebar(props) {

  const drawerWidth = props.drawerWidth;

  const {
    data: allWarehouses, 
    refetch: refetchAllWarehouses
  } = useFindAllWarehousesQuery();

  const {
    data: allCategories, 
    refetch: refetchAllCategories
  } = useFindAllCategoriesQuery();

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
          <ListItemButton>
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
        {allWarehouses?.map((warehouse) => (
          <ListItem key={warehouse.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WarehouseIcon />
              </ListItemIcon>
              <ListItemText primary={warehouse.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
            Items
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary='All Items' />
          </ListItemButton>
        </ListItem>
        <ListItem>
            By Category
        </ListItem>
        {allCategories?.map((category) => (
          <ListItem key={category.id} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}