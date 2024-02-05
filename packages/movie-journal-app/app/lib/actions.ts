'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';

import {
  createNewMovie,
  updateMovieById,
  deleteMovieById,
  signUpUser,
} from './data';
import { Movie } from './definitions';
import { signIn, auth } from '../../auth';
import { UserSchema, FormSchema } from './validators';

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    film?: string[];
    review?: string[];
    username?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

const CreateMovie = FormSchema.omit({ id: true });

export async function createMovie(prevState: State, formData: FormData) {
  const validatedFields = CreateMovie.safeParse({
    film: formData.get('film'),
    dateWatched: formData.get('dateWatched'),
    review: formData.get('review'),
    rating: formData.get('rating'),
    like: formData.get('like'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Movie.',
    };
  }

  const mergedData = { ...validatedFields.data };
  const session = await auth();
  const email = (session?.user?.email as string) || '';

  try {
    await createNewMovie(mergedData, email);
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/dashboard/diary');
  redirect('/dashboard/diary');
}

const UpdateMovie = FormSchema.omit({ id: true, film: true });

export async function updateMovie(
  originalData: Movie,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateMovie.safeParse({
    dateWatched: formData.get('dateWatched'),
    review: formData.get('review'),
    rating: formData.get('rating'),
    like: formData.get('like'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Movie.',
    };
  }

  const mergedData = { ...originalData, ...validatedFields.data };
  const { id, ...dataWithoutId } = mergedData;

  try {
    await updateMovieById(dataWithoutId, id);
  } catch (error) {
    console.error(error);
  }

  revalidatePath('/dashboard/diary');
  redirect('/dashboard/diary');
}

export async function deleteMovie(id: string) {
  try {
    await deleteMovieById(id);
    revalidatePath('/dashboard/diary');
  } catch (error) {
    console.error(error);
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = UserSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const mergedData = { ...validatedFields.data };

  try {
    await signUpUser(
      mergedData.username,
      mergedData.email,
      mergedData.password
    );
  } catch (error) {
    console.error(error);
  }

  redirect('/dashboard');
}
