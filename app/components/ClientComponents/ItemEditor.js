// app/components/ClientComponents/ItemEditor.js
'use client';

import { useState, useEffect } from 'react';
import { useGetItemByIdQuery, useUpdateItemMutation } from '@/app/lib/redux/api';
import { useAppSelector, useAppDispatch } from '@/app/lib/redux/hooks';
import { setSelectedItem } from '@/app/lib/redux/slices/itemsSlice';

export default function ItemEditor() {
  const selectedItemId = useAppSelector(state => state.items.selectedItemId);
  const dispatch = useAppDispatch();
  
  const [itemData, setItemData] = useState({ name: '', description: '' });
  
  const { data: item, isLoading } = useGetItemByIdQuery(selectedItemId, { 
    skip: !selectedItemId 
  });
  
  const [updateItem, { isLoading: isUpdating }] = useUpdateItemMutation();
  
  useEffect(() => {
    if (item) {
      setItemData({ name: item.name, description: item.description });
    }
  }, [item]);
  
  const handleSave = async () => {
    if (selectedItemId) {
      await updateItem({
        id: selectedItemId,
        ...itemData
      });
      dispatch(setSelectedItem(null));
    }
  };
  
  if (!selectedItemId) return null;
  
  if (isLoading) return <div className="p-4 border rounded">Loading item...</div>;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              value={itemData.name}
              onChange={(e) => setItemData({ ...itemData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={itemData.description}
              onChange={(e) => setItemData({ ...itemData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded"
              rows={3}
            />
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => dispatch(setSelectedItem(null))}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isUpdating}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {isUpdating ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}