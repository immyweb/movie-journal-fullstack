'use client';

import { SimpleGrid, Skeleton, Paper } from '@mantine/core';

export function CardsSkeleton() {
  return (
    <SimpleGrid cols={3}>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </SimpleGrid>
  );
}

export function CardSkeleton() {
  return (
    <Paper shadow="xs" p="xl" withBorder>
      <Skeleton height={20} mb={15} radius="xl" />
      <Skeleton height={12} radius="xl" />
    </Paper>
  );
}

export function TableSkeleton() {
  return (
    <>
      <Skeleton height={12} mb={25} />
      <Skeleton height={12} mb={25} />
      <Skeleton height={12} mb={25} />
      <Skeleton height={12} mb={25} />
      <Skeleton height={12} mb={25} />
      <Skeleton height={12} mb={25} />
      <Skeleton height={12} mb={25} />
    </>
  );
}
