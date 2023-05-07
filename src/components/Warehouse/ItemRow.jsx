import { useState } from "react";

import { TableRow, TableCell, Button } from "@mui/material";
import { useDeleteItemMutation, useUpdateItemMutation } from "../../api/itemApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function ItemRow(props) {
  const item = props.item;
  const [isEdit, setIsEdit] = useState(false);
  
  const [inputName, setInputName] = useState(item?.name);
  const [inputDesc, setInputDesc] = useState(item?.description);

  const [deleteItem] = useDeleteItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const navigate = useNavigate();
  const location = useLocation();


  function handleSubmitEdit(item) {
    updateItem({
      ...item,
      name: inputName,
      description: inputDesc,
    })
    .unwrap()
    .then(() =>{
      setIsEdit(false);
      navigate('/warehouse', {state: {...location.state, refetch: new Date()}})
    });
  }

  function handleCancelEdit() {
    setInputName(item.name ?? '');
    setInputDesc(item.description ?? '');
    setIsEdit(false);
  }

  function handleDelete(id) {
    deleteItem(id)
    .unwrap()
    .then(() => navigate('/warehouse', {state: {...location.state, refetch: new Date()}}));
  }

  if (isEdit) {
    return (
      <TableRow
        key={item.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          <input value={inputName} onChange={e => setInputName(e.target.value)} />
        </TableCell>
        <TableCell>
        <input value={inputDesc} onChange={e => setInputDesc(e.target.value)} />
        </TableCell>
        <TableCell align="right">
          <Button 
            onClick={() => handleSubmitEdit(item)}
          >
            Submit
          </Button>
          <Button 
            onClick={() => handleCancelEdit()}
          >
            Cancel
          </Button>
          <Button 
            color='error'
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    )
  } else {
    return (
      <TableRow
        key={item.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {item.name}
        </TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell align="right">
          <Button onClick={() => setIsEdit(true)}>Edit</Button>
        </TableCell>
      </TableRow>
    )
  }
}