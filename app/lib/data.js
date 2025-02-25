// app/lib/data.js
export async function getItems() {
    // Use optional cache settings
    const res = await fetch('http://localhost:3000/api/items', { 
      next: { 
        revalidate: 60 // Revalidate data every 60 seconds
      } 
    });
    
    if (!res.ok) throw new Error('Failed to fetch items');
    return res.json();
  }
  
  export async function getItemById(id) {
    const res = await fetch(`http://localhost:3000/api/items/${id}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) throw new Error(`Failed to fetch item ${id}`);
    return res.json();
  }