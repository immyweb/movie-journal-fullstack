import { Suspense } from 'react';
import { Metadata } from 'next';

import { auth } from '../../../auth';
import Search from '../../ui/search';
import { CreateMovie } from '../../ui/diary/buttons';
import MoviesTable from '../../ui/diary/table';
import { fetchMoviesPages } from '../../lib/data';
import Pagination from '../../ui/diary/pagination';
import { TableSkeleton } from '../../ui/skeleton';

export const metadata: Metadata = {
  title: 'Movie Diary',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const session = await auth();
  const email = (session?.user?.email as string) || '';

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const display = 6;
  const totalPages = Math.ceil(
    (await fetchMoviesPages(query, email)) / display
  );

  return (
    <main>
      <h1>Your Movies</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 35,
        }}
      >
        <Search placeholder="Search your movies..." />
        <CreateMovie />
      </div>
      <section>
        <Suspense fallback={<TableSkeleton />}>
          <MoviesTable currentPage={currentPage} query={query} email={email} />
          <Pagination totalPages={totalPages} />
        </Suspense>
      </section>
    </main>
  );
}
