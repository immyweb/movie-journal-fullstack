import { CardsSkeleton } from '../../ui/skeleton';

export default function Loading() {
  return (
    <main>
      <h1>Dashboard</h1>
      <section>
        <CardsSkeleton />
      </section>
    </main>
  );
}
