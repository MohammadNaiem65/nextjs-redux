// app/api/items/[id]/route.js
import { NextResponse } from 'next/server';

// Reference the same in-memory items
// In a real app, you'd use a database
let items = [
  { id: 1, name: 'Product A', description: 'This is product A' },
  { id: 2, name: 'Product B', description: 'This is product B' },
  { id: 3, name: 'Service C', description: 'This is service C' },
];

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  const item = items.find(item => item.id === id);
  
  if (!item) {
    return NextResponse.json(
      { error: 'Item not found' },
      { status: 404 }
    );
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return NextResponse.json(item);
}

export async function PUT(request, { params }) {
  const id = parseInt(params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return NextResponse.json(
      { error: 'Item not found' },
      { status: 404 }
    );
  }
  
  const updates = await request.json();
  
  // Update the item
  items[itemIndex] = {
    ...items[itemIndex],
    ...updates,
    id, // Ensure ID doesn't change
  };
  
  return NextResponse.json(items[itemIndex]);
}

export async function DELETE(request, { params }) {
  const id = parseInt(params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return NextResponse.json(
      { error: 'Item not found' },
      { status: 404 }
    );
  }
  
  items.splice(itemIndex, 1);
  
  return NextResponse.json({ success: true });
}