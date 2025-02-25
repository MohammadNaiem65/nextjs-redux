// app/components/ServerComponents/ServerItems.js
import { getItems } from '@/app/lib/data';

export default async function ServerItems() {
  // Server-side data fetching with caching/revalidation strategies
  const items = await getItems();
  
  return (
    <div className="bg-gray- p-4 rounded shadow">
      <p className="text-sm text-gray-500 mb-2">This list is rendered on the server:</p>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="p-3 bg-white rounded border">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}