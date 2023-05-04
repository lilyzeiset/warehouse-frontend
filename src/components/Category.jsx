import { useRef } from 'react';
import {
  useFindAllCategoriesQuery,
  useFindCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from '../api/categoryApi';

export default function Category() {
  /**
   * Find all Categories
   */
  const {data: allCategories, refetch} = useFindAllCategoriesQuery();

  function handleFindAllCategories(event) {
    event.preventDefault();
    console.log(allCategories);
  }

  /**
   * Create Category
   */
  const [createCategory] = useCreateCategoryMutation();

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);

  function handleCreateCategory(event) {
    event.preventDefault();

    const newCategory = {
        name: String(nameRef.current.value),
        description: String(descriptionRef.current.value)
    }

    createCategory(newCategory)
        .unwrap()
        .then(() => refetch());
  }

  return (
  <div>
    <h1>Categories</h1>
    <button onClick={handleFindAllCategories}>
      Find all Categories
    </button>
    <br />
    <form onSubmit={handleCreateCategory}>
      Name: <input ref={nameRef} />
      Description: <input ref={descriptionRef} />
      <button>Create Category</button>
    </form>
  </div>
  )
}