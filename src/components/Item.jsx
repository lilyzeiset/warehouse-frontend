import { useRef } from 'react';
import {
  useFindAllItemsQuery,
  useFindItemByIdQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation
} from '../api/itemApi';

export default function Item() {
  /**
   * Find all items
   */
  const {data: allItems, refetch} = useFindAllItemsQuery();

  function handleFindAllItems(event) {
    event.preventDefault();
    console.log(allItems);
  }

  /**
   * Create item
   */
  const [createItem] = useCreateItemMutation();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  function handleCreateItem(event) {
    event.preventDefault();

    const newItem = {
        categoryId: 1,
        name: String(nameRef.current.value),
        description: String(descriptionRef.current.value)
    }

    createItem(newItem)
        .unwrap()
        .then(() => refetch());
  }

  return (
  <div>
    <h1>Items</h1>
    <button onClick={handleFindAllItems}>
      Find all items
    </button>
    <br />
    <form onSubmit={handleCreateItem}>
      Name: <input ref={nameRef} />
      Description: <input ref={descriptionRef} />
      <button>Create Item</button>
    </form>
  </div>
  )
}