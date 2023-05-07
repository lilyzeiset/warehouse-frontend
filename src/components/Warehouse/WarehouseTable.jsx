import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { useGetWarehouseItemsQuery } from '../../api/warehouseApi';
import { useEffect } from 'react';

import AddItem from './AddItem';
import ItemRow from './ItemRow';

export default function WarehouseTable(props) {
  
  const warehouseId = props.warehouseId;

  const {
    data: items,
    refetch: refetchWarehouseItems
  } = useGetWarehouseItemsQuery(warehouseId);

  useEffect(() => {
    refetchWarehouseItems();
  }, [location.state?.refetch])

  return (
    <div>
      <AddItem warehouseId={warehouseId}/>
      
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items?.map((item) => (
            <ItemRow key={item.id} item={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}