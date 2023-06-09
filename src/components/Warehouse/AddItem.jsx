import { useState, useContext } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import { useCreateItemMutation } from "../../api/itemApi";
import WarehouseContext from "../../contexts/warehouseContext";

/**
 * Add item component
 * handles adding an item to a warehouse
 */
export default function AddItem(){
  
  const {thisWarehouse} = useContext(WarehouseContext);
  const warehouseId = thisWarehouse.id;

  const [isAdding, setIsAdding] = useState(false);

  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [createItem] = useCreateItemMutation();

  const navigate = useNavigate();
  const location = useLocation();

  /**
   * submits the new item and refetches data
   * if max capacity reached, cancels add and displays an error message for 10 secs 
   */
  function handleAddItem() {
    const newItem = {
      name: String(inputName),
      description: String(inputDesc),
      warehouseId: warehouseId
    }

    createItem(newItem)
      .unwrap()
      .then(() => navigate('/warehouse', {state: {...location.state, refetch: new Date()}}))
      .catch((error) => {
        setErrorMsg(error.data.message);
        setTimeout(() => setErrorMsg(''), 10000)
        handleCancelAdd();
      });
  }

  /**
   * cancels adding an item
   */
  function handleCancelAdd() {
    setInputName('');
    setInputDesc('');
    setIsAdding(false);
  }

  if (isAdding) {
    return (
      <Stack spacing={2} direction='row'>
        <TextField variant='standard' label='Item name' value={inputName} onChange={e => setInputName(e.target.value)} />
        <TextField variant='standard' label='Description' value={inputDesc} onChange={e => setInputDesc(e.target.value)} />
        <Button 
          variant='outlined' 
          onClick={() => handleCancelAdd()}
        >
          Cancel
        </Button>
        <Button 
          variant='contained' 
          onClick={() => handleAddItem()}
        >
          Submit
        </Button>
      </Stack>
    )
  }

  return (
    <Stack spacing={2} direction='row'>
      <Button variant='contained' onClick={() => setIsAdding(true)}>
        Add Item
      </Button>
      <Typography variant='body1' sx={{color: 'red'}}>
        {errorMsg}
      </Typography>
    </Stack>
  )
}