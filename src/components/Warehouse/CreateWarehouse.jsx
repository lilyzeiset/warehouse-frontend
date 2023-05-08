import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Stack, TextField } from "@mui/material";

import { useCreateWarehouseMutation } from "../../api/warehouseApi";

/**
 * Create warehouse component
 */
export default function CreateWarehouse() {

  const [createWarehouse] = useCreateWarehouseMutation();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const addressRef = useRef(null);
  const maxCapacityRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  function handleCreateWarehouse() {

    const newWarehouse = {
        name: String(nameRef.current.value),
        description: String(descriptionRef.current.value),
        address: String(addressRef.current.value),
        maxCapacity: String(maxCapacityRef.current.value)
    }

    createWarehouse(newWarehouse)
        .unwrap()
        .then(() => navigate('/', {state: {...location.state, refetch: new Date()}}));
  }

  return (
    <Stack spacing={2} sx={{maxWidth: 480}}>
      <TextField label='Warehouse name' inputRef={nameRef} />
      <TextField label='Description' inputRef={descriptionRef} />
      <TextField label='Address' inputRef={addressRef} />
      <TextField label='Max capacity' inputRef={maxCapacityRef} type='number' />
      <Button variant='contained' onClick={handleCreateWarehouse}>Create warehouse</Button>
    </Stack>
  )
}