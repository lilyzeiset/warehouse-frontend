import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

import {
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation
} from '../../api/warehouseApi';
import WarehouseContext from '../../contexts/warehouseContext';

export default function Warehouse() {

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

  function handleCancelEdit() {
    setInputName(thisWarehouse.name ?? '');
    setInputDesc(thisWarehouse.description ?? '');
    setInputAddr(thisWarehouse.address ?? '');
    setInputMaxCap(thisWarehouse.maxCapacity ?? '');
    setIsEdit(false);
  }

  function handleDelete(warehouseId) {
    deleteWarehouse(warehouseId)
    .unwrap()
    .then(() => navigate('/', {state: {...location.state, refetch: new Date()}}));
  }

  if (isEdit) {
    return (
      <div>
        Warehouse name: <input value={inputName} onChange={e => setInputName(e.target.value)} />
        <br />
        Description: <input value={inputDesc} onChange={e => setInputDesc(e.target.value)} />
        <br />
        Address: <input value={inputAddr} onChange={e => setInputAddr(e.target.value)} />
        <br />
        Max Capacity: <input value={inputMaxCap} onChange={e => setInputMaxCap(e.target.value)} />
        <br />
        <Box>
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
        </Box>
      </div>
    )
  } else {
    return (
      <div>
        <Button 
          variant='contained' 
          onClick={() => {
            setInputName(thisWarehouse.name ?? '');
            setInputDesc(thisWarehouse.description ?? '');
            setInputAddr(thisWarehouse.address ?? '');
            setIsEdit(true);
          }}
        >
          Edit warehouse
        </Button>
        <h1>Warehouse {thisWarehouse?.name}</h1>
        <h3>Description: {thisWarehouse?.description}</h3>
        <h3>Address: {thisWarehouse?.address}</h3>
        <h3>Capacity: {currentCapacity} / {thisWarehouse?.maxCapacity}</h3>
      </div>
    )
  }
}