'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import Link from 'next/link';
import {
  Button,
  Checkbox,
  Textarea,
  Title,
  Rating,
  SimpleGrid,
} from '@mantine/core';
import DatePicker from './date-picker';
import { Movie } from '../../lib/definitions';
import { updateMovie } from '../../lib/actions';

export default function EditMovieForm({ movie }: { movie: Movie }) {
  const [checked, setChecked] = useState(movie.like);
  const [review, setReview] = useState(movie.review);

  const initialState = { message: null, errors: {} };
  const updateMovieWithId = updateMovie.bind(null, movie);
  const [state, dispatch] = useFormState(updateMovieWithId, initialState);

  return (
    <form action={dispatch}>
      <SimpleGrid cols={1} spacing="xl">
        <Title order={2}>{movie.film}</Title>
        <DatePicker id="dateWatched" date={movie.dateWatched} />
        <Textarea
          placeholder="Add review"
          id="review"
          name="review"
          label="Add a review"
          autosize
          minRows={2}
          value={review}
          onChange={(e) => setReview(e.currentTarget.value)}
          error={state.errors?.review}
        />
        <Rating
          fractions={2}
          defaultValue={movie.rating}
          id="rating"
          name="rating"
        />
        <Checkbox
          label="Like"
          checked={checked}
          onChange={(e) => setChecked(e.currentTarget.checked)}
          id="like"
          name="like"
        />
        <SimpleGrid cols={2}>
          <div>
            <Button component={Link} href="/dashboard/diary" variant="default">
              Cancel
            </Button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="filled" type="submit">
              Update
            </Button>
          </div>
        </SimpleGrid>
      </SimpleGrid>
    </form>
  );
}
