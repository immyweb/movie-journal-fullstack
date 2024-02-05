import Link from 'next/link';
import { Text, Title } from '@mantine/core';
import { IconMoodConfuzedFilled } from '@tabler/icons-react';

export default function NotFound() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '50%',
        margin: '0 auto',
      }}
    >
      <div>
        <IconMoodConfuzedFilled size={30} />
      </div>
      <Title order={1} mb={25}>
        404 Not Found
      </Title>
      <Text mb={25}>Could not find the requested movie.</Text>
      <Link href="/dashboard/diary">Go Back</Link>
    </main>
  );
}
