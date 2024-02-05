'use client';

import { Table, Rating } from '@mantine/core';
import dayjs from 'dayjs';
import { IconThumbUp } from '@tabler/icons-react';
import { UpdateMovie, DeleteMovie } from './buttons';
import { fetchFilteredMovies } from '../../lib/data';
import { Movie } from '../../lib/definitions';

export default async function MoviesTable({
  query,
  currentPage,
  email,
}: {
  query: string;
  currentPage: number;
  email: string;
}) {
  const movies: Movie[] = await fetchFilteredMovies(query, currentPage, email);

  const rows = movies.map((movie) => (
    <Table.Tr key={movie.film}>
      <Table.Td>{dayjs(movie.dateWatched).format('MMM YYYY')}</Table.Td>
      <Table.Td>{dayjs(movie.dateWatched).format('DD')}</Table.Td>
      <Table.Td>
        <div style={{ display: 'flex', gap: 15 }}>{movie.film}</div>
      </Table.Td>
      <Table.Td>
        <Rating defaultValue={movie.rating} />
      </Table.Td>
      <Table.Td>{movie.like ? <IconThumbUp /> : ''}</Table.Td>
      <Table.Td>
        <UpdateMovie id={movie.id} />
      </Table.Td>
      <Table.Td>
        <DeleteMovie id={movie.id} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Month</Table.Th>
            <Table.Th>Day</Table.Th>
            <Table.Th>Film</Table.Th>
            <Table.Th>Rating</Table.Th>
            <Table.Th>Like</Table.Th>
            <Table.Th>Edit</Table.Th>
            <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </>
  );
}
