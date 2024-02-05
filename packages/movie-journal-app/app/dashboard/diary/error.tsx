'use client';

import { useEffect } from 'react';
import { Button, Title } from '@mantine/core';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main>
      <Title order={1} mb={25}>
        Something went wrong!
      </Title>
      <Button onClick={() => reset()}>Try again</Button>
    </main>
  );
}
