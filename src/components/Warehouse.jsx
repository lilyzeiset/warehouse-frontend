import { useRef } from 'react';
import {
  useFindAllWarehousesQuery,
  useFindWarehouseByIdQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation
} from '../api/warehouseApi';

export default function Warehouse() {
  /**
   * Find all warehouses
   */
  const {data: allWarehouses, refetch} = useFindAllWarehousesQuery();

  function handleFindAllWarehouses(event) {
    event.preventDefault();
    console.log(allWarehouses);
  }

  /**
   * Create warehouse
   */
  const [createWarehouse] = useCreateWarehouseMutation();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  function handleCreateWarehouse(event) {
    event.preventDefault();

    const newWarehouse = {
        categoryId: 1,
        name: String(nameRef.current.value),
        description: String(descriptionRef.current.value)
    }

    createWarehouse(newWarehouse)
        .unwrap()
        .then(() => refetch());
  }

  return (
  <div>
    <h1>Warehouses</h1>
    <button onClick={handleFindAllWarehouses}>
      Find all warehouses
    </button>
    <br />
    <form onSubmit={handleCreateWarehouse}>
      Name: <input ref={nameRef} />
      Description: <input ref={descriptionRef} />
      <button>Create warehouse</button>
    </form>
  </div>
  )
}