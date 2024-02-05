'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Center, Pagination, Group } from '@mantine/core';

export default function PaginationList({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Center mt={35}>
      <Pagination.Root
        total={totalPages}
        getItemProps={(page) => ({
          component: Link,
          href: createPageURL(page),
        })}
      >
        <Group gap={7} mt="xl">
          <Pagination.Previous
            component={Link}
            href={createPageURL(currentPage - 1)}
          />
          <Pagination.Items />
          <Pagination.Next
            component={Link}
            href={createPageURL(currentPage + 1)}
          />
        </Group>
      </Pagination.Root>
    </Center>
  );
}
