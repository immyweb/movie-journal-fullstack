import 'reflect-metadata';
import { Int, InputType, Field } from 'type-graphql';

@InputType()
export class MovieCreateInput {
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
}
