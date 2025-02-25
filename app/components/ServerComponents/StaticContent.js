export default function StaticContent() {
    return (
        <section className='bg-blue- p-6 rounded-lg shadow-sm'>
            <h2 className='text-2xl font-bold mb-4'>
                Welcome to Our Item Manager
            </h2>
            <p className='text-white mb-3'>
                This application demonstrates a hybrid rendering approach in
                Next.js 15:
            </p>
            <ul className='list-disc pl-5 space-y-1 text-white'>
                <li>Server-rendered content for fast initial load and SEO</li>
                <li>
                    Client-side interactivity with Redux and RTK Query where
                    needed
                </li>
                <li>
                    Efficient data fetching that minimizes client-side
                    JavaScript
                </li>
            </ul>
        </section>
    );
}
