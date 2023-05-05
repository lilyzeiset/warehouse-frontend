import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useContext } from 'react';

import WarehouseContext from '../../contexts/warehouseContext';
import { useFindAllLotsByWarehouseIdQuery } from '../../api/lotApi';
import { useFindItemByIdQuery } from '../../api/itemApi';

export default function WarehouseTable(props) {

  const warehouse = useContext(WarehouseContext);
  
  const warehouseId = props.warehouseId;
  // console.log(warehouse?.id);



  const {
    data: lots,
    refetch: refetchLots
  } = useFindAllLotsByWarehouseIdQuery(warehouseId);
  const {
    data: item,
    refetch: refetchItem
  } = useFindItemByIdQuery();
  

  return (
    <div>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lots?.map((lot) => (
            <TableRow
              key={lot.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {lot.itemId}
              </TableCell>
              <TableCell align="right">{lot.itemId}</TableCell>
              <TableCell align="right">{lot.quantity}</TableCell>
              <TableCell align="right">{lot.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}