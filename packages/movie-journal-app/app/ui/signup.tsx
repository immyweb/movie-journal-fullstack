'use client';

import {
  Container,
  Title,
  Fieldset,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';
import { useFormState, useFormStatus } from 'react-dom';
import { createUser } from '../lib/actions';

export default function SignUpForm() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <Container>
      <Title order={1} mb={45} mt={45}>
        Please sign up to continue.
      </Title>
      <form action={dispatch}>
        <Fieldset mb={30}>
          <TextInput
            label="Name"
            id="username"
            type="username"
            name="username"
            placeholder="Name"
            error={state.errors?.username}
            required
          />
          <TextInput
            label="Email"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            mt="md"
            error={state.errors?.email}
            required
          />
          <PasswordInput
            label="Password"
            id="password"
            name="password"
            placeholder="password"
            mt="md"
            error={state.errors?.password}
            required
          />
        </Fieldset>
        <SignUpButton />
        {state.errors && (
          <div role="alert" style={{ color: 'red' }}>
            {state.message}
          </div>
        )}
      </form>
    </Container>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="filled" type="submit" aria-disabled={pending}>
      Sign up
    </Button>
  );
}
