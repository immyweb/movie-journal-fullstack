import { z } from 'zod';

const FormSchema = z.object({
  id: z.string(),
  dateWatched: z.string(),
  film: z.string().min(1, { message: 'Please select a movie.' }),
  review: z.coerce.string().min(5, { message: 'Please add a review.' }),
  rating: z.coerce.number(),
  like: z.coerce.boolean(),
});

const UserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export { FormSchema, UserSchema };
