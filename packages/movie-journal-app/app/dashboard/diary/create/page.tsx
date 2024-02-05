import { Metadata } from 'next';
import Breadcrumbs from '../../../ui/diary/breadcrumbs';
import Form from '../../../ui/diary/create-form';

export const metadata: Metadata = {
  title: 'Add Movie',
};

export const dynamic = 'force-dynamic';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Diary', href: '/dashboard/diary' },
          {
            label: 'Add Movie',
            href: '/dashboard/diary/create',
            active: true,
          },
        ]}
      />
      <div>
        <Form />
      </div>
    </main>
  );
}
