// app/actions.js
'use server';

import { revalidatePath } from 'next/cache';

export async function createItem(formData) {
  const name = formData.get('name');
  const description = formData.get('description') || '';
  
  // Validate data
  if (!name) {
    return { error: 'Name is required' };
  }
  
  // Send to API
  const res = await fetch('http://localhost:3000/api/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description }),
  });
  
  if (!res.ok) {
    return { error: 'Failed to create item' };
  }
  
  // Revalidate the path to update server components
  revalidatePath('/');
  return { success: true };
}