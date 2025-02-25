// app/api/items/route.js
import { NextResponse } from 'next/server';

// In-memory database for example purposes
let items = [
  { id: 1, name: 'Product A', description: 'This is product A' },
  { id: 2, name: 'Product B', description: 'This is product B' },
  { id: 3, name: 'Service C', description: 'This is service C' },
];

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(items);
}

export async function POST(request) {
  const newItem = await request.json();
  
  // Simple validation
  if (!newItem.name) {
    return NextResponse.json(
      { error: 'Name is required' },
      { status: 400 }
    );
  }
  
  // Generate new ID
  const id = items.length > 0 
    ? Math.max(...items.map(item => item.id)) + 1 
    : 1;
  
  const createdItem = {
    id,
    name: newItem.name,
    description: newItem.description || '',
  };
  
  items.push(createdItem);
  
  return NextResponse.json(createdItem, { status: 201 });
}