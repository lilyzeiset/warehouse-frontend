import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Typography, TextField, Stack, Box } from '@mui/material';

import {
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation
} from '../../api/warehouseApi';
import WarehouseContext from '../../contexts/warehouseContext';

export default function WarehouseInfo() {

  const {thisWarehouse, currentCapacity} = useContext(WarehouseContext);

  const navigate = useNavigate();
  const location = useLocation();
  
  const [updateWarehouse] = useUpdateWarehouseMutation();
  const [deleteWarehouse] = useDeleteWarehouseMutation();

  const [isEdit, setIsEdit] = useState(false);

  const [inputName, setInputName] = useState(thisWarehouse?.name);
  const [inputDesc, setInputDesc] = useState(thisWarehouse?.description);
  const [inputAddr, setInputAddr] = useState(thisWarehouse?.address);
  const [inputMaxCap, setInputMaxCap] = useState(thisWarehouse?.maxCapacity);
  
  /**
   * handles submitting an edit to the warehouse
   */
  function handleSubmitEdit(warehouse) {
    updateWarehouse({
      ...warehouse,
      name: inputName,
      description: inputDesc,
      address: inputAddr,
      maxCapacity: inputMaxCap
    })
    .unwrap()
    .then(() =>{
      setIsEdit(false);
      navigate('/warehouse', {state: {...location.state, refetch: new Date()}})
    });
  }

  /**
   * handles cancelling an edit to the warehouse
   * resets inputs to original values
   */
  function handleCancelEdit() {
    setInputName(thisWarehouse.name ?? '');
    setInputDesc(thisWarehouse.description ?? '');
    setInputAddr(thisWarehouse.address ?? '');
    setInputMaxCap(thisWarehouse.maxCapacity ?? '');
    setIsEdit(false);
  }

  /**
   * handles deleting the warehouse
   * sends user back to home page since current warehouse will no longer exist
   */
  function handleDelete(warehouseId) {
    deleteWarehouse(warehouseId)
    .unwrap()
    .then(() => navigate('/', {state: {...location.state, refetch: new Date()}}));
  }

  if (isEdit) {
    return (
      <Stack spacing={2} sx={{maxWidth: 480}}>
        <TextField label='Warehouse name' value={inputName} onChange={e => setInputName(e.target.value)} />
        <TextField label='Description' value={inputDesc} onChange={e => setInputDesc(e.target.value)} />
        <TextField label='Address' value={inputAddr} onChange={e => setInputAddr(e.target.value)} />
        <TextField label='Max Capacity' type='number' value={inputMaxCap} onChange={e => setInputMaxCap(e.target.value)} />
        <Stack spacing={2} direction='row'>
          <Button 
            variant='contained' 
            onClick={() => handleSubmitEdit(thisWarehouse)}
          >
            Submit
          </Button>
          <Button 
            variant='contained' 
            onClick={() => handleCancelEdit()}
          >
            Cancel
          </Button>
          <Button 
            color='error'
            variant='contained' 
            onClick={() => handleDelete(thisWarehouse.id)}
          >
            Delete warehouse
          </Button>
        </Stack>
      </Stack>
    )
  } else {
    return (
      <Stack spacing={2} maxWidth={480}>
        <Typography variant="h4">
          Warehouse {thisWarehouse?.name}
        </Typography>
        <Typography variant="h5">
          Description: {thisWarehouse?.description}
        </Typography>
        <Typography variant="h5">
          Address: {thisWarehouse?.address}
        </Typography>
        <Typography variant="h5">
          Capacity: {currentCapacity} / {thisWarehouse?.maxCapacity}
        </Typography>
        <Box>
          <Button 
            variant='contained' 
            onClick={() => {
              setInputName(thisWarehouse.name ?? '');
              setInputDesc(thisWarehouse.description ?? '');
              setInputAddr(thisWarehouse.address ?? '');
              setInputMaxCap(thisWarehouse.maxCapacity ?? '');
              setIsEdit(true);
            }}
          >
            Edit warehouse
          </Button>
        </Box>
      </Stack>
    )
  }
}