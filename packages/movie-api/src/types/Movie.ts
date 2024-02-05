import 'reflect-metadata';
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { User } from './User';

@ObjectType()
export class Movie {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  dateWatched: Date;

  @Field(() => String)
  film: string;

  @Field(() => String)
  review: string;

  @Field(() => Int)
  rating: number;

  @Field(() => Boolean)
  like: boolean;

  @Field(() => User)
  author: User;

  @Field(() => String)
  authorId: string;
}
