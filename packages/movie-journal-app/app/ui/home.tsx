'use client';

import Link from 'next/link';
import { Container, Title, Button, Box, Text, Group } from '@mantine/core';

export default function Home() {
  return (
    <Container size="md">
      <Box component="header" mb={35} mt={50}>
        <Title order={1}>Movie Journal</Title>
      </Box>
      <main>
        <Text mb={25}>
          Movie Journal is a social platform for sharing your taste in film. Use
          it as a diary to record your opinion about films as you watch them, or
          just to keep track of films you&apos;ve seen in the past.
        </Text>

        <Text mb={25}>
          Rate, review and tag films as you add them. Find and follow your
          friends to see what theyre enjoying. Keep a watchlist of films
          you&apos;d like to see, and create lists/collections on any topic.
        </Text>

        <Group>
          <Button component={Link} href="/login" variant="filled">
            Log in
          </Button>

          <Button component={Link} href="/signup" variant="light">
            Sign up
          </Button>
        </Group>
      </main>
    </Container>
  );
}
