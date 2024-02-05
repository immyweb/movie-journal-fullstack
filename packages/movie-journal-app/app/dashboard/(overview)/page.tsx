import { Suspense } from 'react';
import { auth } from '../../../auth';

import CardWrapper from '../../ui/dashboard/card';
import { CardsSkeleton } from '../../ui/skeleton';

export default async function Page() {
  const session = await auth();
  const email = (session?.user?.email as string) || '';

  return (
    <main>
      <h1>Dashboard</h1>
      <h2>Welcome {email}!</h2>
      <section>
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper email={email} />
        </Suspense>
      </section>
    </main>
  );
}
