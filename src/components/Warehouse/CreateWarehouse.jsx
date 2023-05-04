import { useRef } from "react";
import { useCreateWarehouseMutation } from "../../api/warehouseApi";
import { useLocation, useNavigate } from "react-router-dom";

export default function CreateWarehouse() {

  const [createWarehouse] = useCreateWarehouseMutation();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  function handleCreateWarehouse(event) {
    event.preventDefault();

    const newWarehouse = {
        categoryId: 1,
        name: String(nameRef.current.value),
        description: String(descriptionRef.current.value)
    }

    createWarehouse(newWarehouse)
        .unwrap()
        .then(() => navigate('/', {state: {...location.state, refetch: new Date()}}));
  }

  return (
    <form onSubmit={handleCreateWarehouse}>
      Name: <input ref={nameRef} />
      Description: <input ref={descriptionRef} />
      <button>Create warehouse</button>
    </form>
  )
}