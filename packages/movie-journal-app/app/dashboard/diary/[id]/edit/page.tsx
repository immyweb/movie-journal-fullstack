import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import Breadcrumbs from '../../../../ui/diary/breadcrumbs';
import Form from '../../../../ui/diary/edit-form';
import { fetchMovieById } from '../../../../lib/data';

export const metadata: Metadata = {
  title: 'Edit Movie',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const movie = await fetchMovieById(id);

  if (!movie || Object.keys(movie).length === 0) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Diary', href: '/dashboard/diary' },
          {
            label: 'Edit Movie',
            href: `/dashboard/diary/${id}/edit`,
            active: true,
          },
        ]}
      />
      <div>
        <Form movie={movie} />
      </div>
    </main>
  );
}
