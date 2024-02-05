'use client';

import { useFormState } from 'react-dom';
import { Button, Checkbox, Textarea, Rating, SimpleGrid } from '@mantine/core';
import DatePicker from './date-picker';
import AutoComplete from './autocomplete';
import { createMovie } from '../../lib/actions';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createMovie, initialState);

  return (
    <form action={dispatch}>
      <SimpleGrid cols={1} spacing="xl">
        <AutoComplete />
        <DatePicker id="dateWatched" />
        <Textarea
          placeholder="Add review"
          label="Add a review"
          id="review"
          name="review"
          autosize
          minRows={2}
          error={state.errors?.review}
        />
        <Rating defaultValue={3} id="rating" name="rating" />
        <Checkbox label="Like" id="like" name="like" />
        <div>
          <Button variant="filled" type="submit">
            Save
          </Button>
        </div>
      </SimpleGrid>
    </form>
  );
}
