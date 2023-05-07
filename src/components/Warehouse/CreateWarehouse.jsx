import { useRef } from "react";
import { useCreateWarehouseMutation } from "../../api/warehouseApi";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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
    <form>
      Name: <input ref={nameRef} /><br />
      Description: <input ref={descriptionRef} /><br />
      Address: <input ref={addressRef} /><br />
      Max capacity: <input ref={maxCapacityRef} /><br />
      <Button variant='contained' onClick={handleCreateWarehouse}>Create warehouse</Button>
    </form>
  )
}