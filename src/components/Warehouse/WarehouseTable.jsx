import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Stack, Box } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { useGetWarehouseItemsQuery } from '../../api/warehouseApi';
import { useEffect, useContext } from 'react';
import WarehouseContext from '../../contexts/warehouseContext';

import AddItem from './AddItem';
import ItemRow from './ItemRow';

/**
 * Warehouse item table component
 * fetches items in a particular warehouse
 */
export default function WarehouseTable() {

  const {thisWarehouse} = useContext(WarehouseContext);
  const warehouseId = thisWarehouse.id;

  const {
    data: items,
    refetch: refetchWarehouseItems
  } = useGetWarehouseItemsQuery(warehouseId);

  const location = useLocation();

  /**
   * refetch data when location.state.refetch is changed
   */
  useEffect(() => {
    refetchWarehouseItems();
  }, [location.state?.refetch])

  return (
    <Stack spacing={2} maxWidth={960}>
      <Box>
        <AddItem />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map((item) => (
              <ItemRow key={item.id} item={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  )
}