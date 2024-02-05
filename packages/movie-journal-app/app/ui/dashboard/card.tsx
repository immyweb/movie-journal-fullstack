'use client';

import { Paper, Text, Title, SimpleGrid } from '@mantine/core';
import { fetchCardData } from '../../lib/data';

export default async function CardWrapper({ email }: { email: string }) {
  const { totalWatched, totalLiked, averageRating } = await fetchCardData(
    email
  );

  return (
    <SimpleGrid cols={3}>
      <Card title="Total watched" value={totalWatched} />
      <Card title="Liked" value={totalLiked} />
      <Card title="Avg Rating" value={averageRating} />
    </SimpleGrid>
  );
}

export function Card({
  title,
  value,
}: {
  title: string;
  value: number | string;
}) {
  return (
    <Paper shadow="xs" p="xl" withBorder>
      <Title order={2} size="h2">
        {title}
      </Title>
      <Text>{value}</Text>
    </Paper>
  );
}
