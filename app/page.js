import { Suspense } from 'react';
import ServerItems from './components/ServerComponents/ServerItems';
import StaticContent from './components/ServerComponents/StaticContent';
import ClientItemsContainer from './components/ClientComponents/ClientItems';
import ItemForm from './components/ServerComponents/ItemForm';

export default async function HomePage() {
    return (
        <div className='space-y-8'>
            {/* Static content (server component) */}
            <StaticContent />

            {/* Server-rendered form with Server Actions */}
            <section>
                <h2 className='text-xl font-semibold mb-4'>
                    Server Actions Form
                </h2>
                <ItemForm />
            </section>

            {/* Server-rendered items */}
            <section>
                <h2 className='text-xl font-semibold mb-4'>
                    Server-rendered Items
                </h2>
                <Suspense
                    fallback={
                        <div className='p-4 border rounded'>
                            Loading server items...
                        </div>
                    }
                >
                    <ServerItems />
                </Suspense>
            </section>

            {/* Client-side interactive section */}
            <section>
                <h2 className='text-xl font-semibold mb-4'>
                    Client-interactive Items
                </h2>
                <ClientItemsContainer />
            </section>
        </div>
    );
}
