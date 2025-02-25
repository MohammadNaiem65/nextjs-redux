// app/components/ClientComponents/ClientItems.js
'use client';

import { useState } from 'react';
import { useGetItemsQuery, useAddItemMutation, useDeleteItemMutation } from '@/app/lib/redux/api';
import { useAppDispatch, useAppSelector } from '@/app/lib/redux/hooks';
import { setSelectedItem, setFilterText, toggleSortOrder } from '@/app/lib/redux/slices/itemsSlice';
import ItemEditor from './ItemEditor';

export default function ClientItems() {
  const dispatch = useAppDispatch();
  const filterText = useAppSelector(state => state.items.filterText);
  const sortOrder = useAppSelector(state => state.items.sortOrder);
  const [newItemName, setNewItemName] = useState('');
  
  // RTK Query hooks
  const { data: items = [], isLoading, error } = useGetItemsQuery();
  const [addItem, { isLoading: isAdding }] = useAddItemMutation();
  const [deleteItem] = useDeleteItemMutation();
  
  // Filter and sort items
  const filteredItems = items
    .filter(item => item.name.toLowerCase().includes(filterText.toLowerCase()))
    .sort((a, b) => {
      return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  
  const handleAddItem = async (e) => {
    e.preventDefault();
    if (newItemName.trim()) {
      await addItem({ name: newItemName, description: 'New item description' });
      setNewItemName('');
    }
  };
  
  const handleDeleteItem = async (id) => {
    await deleteItem(id);
  };
  
  if (isLoading) return <div className="p-4 border rounded">Loading items...</div>;
  if (error) return <div className="p-4 border bg-red-50 text-red-500 rounded">Error loading items</div>;
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4 mb-4">
        <input
          type="text"
          placeholder="Filter items..."
          value={filterText}
          onChange={(e) => dispatch(setFilterText(e.target.value))}
          className="px-3 py-2 border rounded flex-grow"
        />
        <button
          onClick={() => dispatch(toggleSortOrder())}
          className="px-3 py-2 bg-gray- rounded"
        >
          Sort: {sortOrder === 'asc' ? '⬆️' : '⬇️'}
        </button>
      </div>
      
      <form onSubmit={handleAddItem} className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="New item name"
          className="px-3 py-2 border rounded flex-grow"
        />
        <button 
          type="submit" 
          disabled={isAdding || !newItemName.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          {isAdding ? 'Adding...' : 'Add Item'}
        </button>
      </form>
      
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-500 mb-2">This list is client-rendered with RTK Query:</p>
        <ul className="space-y-2">
          {filteredItems.map((item) => (
            <li 
              key={item.id} 
              className="p-3 border rounded hover:bg-gray- flex justify-between items-center"
            >
              <div 
                className="cursor-pointer flex-grow"
                onClick={() => dispatch(setSelectedItem(item.id))}
              >
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <button 
                onClick={() => handleDeleteItem(item.id)}
                className="px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        {filteredItems.length === 0 && (
          <p className="text-center p-4 text-gray-500">No items found</p>
        )}
      </div>
      
      <ItemEditor />
    </div>
  );
}