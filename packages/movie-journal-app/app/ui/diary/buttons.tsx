'use client';

import Link from 'next/link';
import { ActionIcon, Button } from '@mantine/core';
import { IconPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import { deleteMovie } from '../../lib/actions';

export function CreateMovie() {
  return (
    <Button
      component={Link}
      href="/dashboard/diary/create"
      rightSection={<IconPlus size={20} />}
    >
      Add Movie
    </Button>
  );
}

export function UpdateMovie({ id }: { id: string }) {
  return (
    <Link href={`/dashboard/diary/${id}/edit`}>
      <IconPencil size={20} />
    </Link>
  );
}

export function DeleteMovie({ id }: { id: string }) {
  const deleteMovieWithId = deleteMovie.bind(null, id);

  return (
    <form action={deleteMovieWithId}>
      <ActionIcon variant="default" type="submit">
        <IconTrash size={20} />
      </ActionIcon>
    </form>
  );
}
