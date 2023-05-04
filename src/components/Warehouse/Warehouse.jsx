import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  useFindWarehouseByIdQuery,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation
} from '../../api/warehouseApi';
import { Button } from '@mui/material';

export default function Warehouse() {

  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    data: thisWarehouse,
    refetch
  } = useFindWarehouseByIdQuery(location.state.warehouseId);
  const [updateWarehouse] = useUpdateWarehouseMutation();
  const [deleteWarehouse] = useDeleteWarehouseMutation();
  
  const [inputName, setInputName] = useState(thisWarehouse?.name);
  const [inputDesc, setInputDesc] = useState(thisWarehouse?.description);
  const [inputAddr, setInputAddr] = useState(thisWarehouse?.address);

  function handleSubmitEdit(warehouse) {
    updateWarehouse({
      ...thisWarehouse,
      name: inputName,
      description: inputDesc,
      address: inputAddr
    })
    .unwrap()
    .then(() =>{
      navigate('/warehouse', {state: {...location.state, refetch: new Date()}})
    });
  }

  function handleCancelEdit() {

  }

  function handleDelete(warehouseId) {
    deleteWarehouse(warehouseId)
    .unwrap()
    .then(() => navigate('/', {state: {...location.state, refetch: new Date()}}));
  }

  if (isEdit) {
    return (
      <div>
        <input value={inputName} onChange={e => setInputName(e.target.value)} />
        <input value={inputDesc} onChange={e => setInputDesc(e.target.value)} />
        <input value={inputAddr} onChange={e => setInputAddr(e.target.value)} />
        <br />
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
        <h3>{thisWarehouse?.description}</h3>
        <h3>{thisWarehouse?.address}</h3>
        
      </div>
    )
  }
}