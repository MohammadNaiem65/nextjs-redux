// app/components/ServerComponents/ItemForm.js
import { createItem } from '@/app/actions';

export default function ItemForm() {
  return (
    <form action={createItem} className="p-4 border rounded bg-">
      <h3 className="font-medium mb-2">Add Item (Server Action)</h3>
      <div className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm mb-1">Name</label>
          <input 
            id="name"
            name="name" 
            className="w-full px-3 py-2 border rounded" 
            required 
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm mb-1">Description</label>
          <input 
            id="description"
            name="description" 
            className="w-full px-3 py-2 border rounded" 
          />
        </div>
        <button 
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Item (No JavaScript)
        </button>
      </div>
    </form>
  );
}