import { Button, Box } from "@mui/material";
import { useState } from "react";
import { useCreateItemMutation } from "../../api/itemApi";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddItem(props){
  const warehouseId = props.warehouseId;

  const [isAdding, setIsAdding] = useState(false);

  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [createItem] = useCreateItemMutation();

  const navigate = useNavigate();
  const location = useLocation();

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
        setTimeout(() => setErrorMsg(''), 5000)
        handleCancelAdd();
      });
  }

  function handleCancelAdd() {
    setInputName('');
    setInputDesc('');
    setIsAdding(false);
  }

  if (isAdding) {
    return (
      <div>
        Item name: <input value={inputName} onChange={e => setInputName(e.target.value)} />
        <br />
        Description: <input value={inputDesc} onChange={e => setInputDesc(e.target.value)} />
        <br />
        <Box>
          <Button 
            variant='contained' 
            onClick={() => handleAddItem()}
          >
            Submit
          </Button>
          <Button 
            variant='contained' 
            onClick={() => handleCancelAdd()}
          >
            Cancel
          </Button>
        </Box>
      </div>
    )
  }

  return (
    <>
      <Button variant='contained' onClick={() => setIsAdding(true)}>
        Add Item
      </Button>
      {errorMsg}
    </>
  )
}