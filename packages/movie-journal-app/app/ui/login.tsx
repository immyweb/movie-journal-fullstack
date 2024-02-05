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
import { authenticate } from '../lib/actions';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <Container>
      <Title order={1} mb={45} mt={45}>
        Please log in to continue.
      </Title>
      <form action={dispatch}>
        <Fieldset mb={30}>
          <TextInput
            label="Email"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
          <PasswordInput
            label="Password"
            id="password"
            name="password"
            placeholder="password"
            mt="md"
            required
          />
        </Fieldset>
        <LoginButton />
        {/* <Button component={Link} href="/dashboard">
          Log in
        </Button> */}
        {errorMessage && (
          <div role="alert" style={{ color: 'red' }}>
            {errorMessage}
          </div>
        )}
      </form>
    </Container>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="filled" type="submit" aria-disabled={pending}>
      Log in
    </Button>
  );
}
