import { useState } from "react";
import { TableRow, TableCell, Button, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import { useDeleteItemMutation, useUpdateItemMutation } from "../../api/itemApi";

/**
 * Component for a single item row in the table
 * Handles editing/deleting an item
 * @param props individual item data passed in as prop
 */
export default function ItemRow(props) {
  const item = props.item;
  const [isEdit, setIsEdit] = useState(false);
  
  const [inputName, setInputName] = useState(item?.name);
  const [inputDesc, setInputDesc] = useState(item?.description);

  const [deleteItem] = useDeleteItemMutation();
  const [updateItem] = useUpdateItemMutation();

  const navigate = useNavigate();
  const location = useLocation();

  /**
   * handles submitting an update of the item
   * refetches data
   */
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

  /**
   * cancels an edit
   */
  function handleCancelEdit() {
    setInputName(item.name ?? '');
    setInputDesc(item.description ?? '');
    setIsEdit(false);
  }

  /**
   * deletes an item
   */
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
        <TextField variant='standard' value={inputName} onChange={e => setInputName(e.target.value)} />
        </TableCell>
        <TableCell>
          <TextField variant='standard' value={inputDesc} onChange={e => setInputDesc(e.target.value)} />
        </TableCell>
        <TableCell align="right">
          <Button onClick={() => handleCancelEdit()}>
            Cancel
          </Button>
          <Button onClick={() => handleSubmitEdit(item)}>
            Submit
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
        <TableCell>
          {item.description}
        </TableCell>
        <TableCell align="right">
          <Button color='error' onClick={() => handleDelete(item.id)}>
            Delete
          </Button>
          <Button onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        </TableCell>
      </TableRow>
    )
  }
}