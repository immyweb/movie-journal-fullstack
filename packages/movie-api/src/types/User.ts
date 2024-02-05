import 'reflect-metadata';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsEmail } from 'class-validator';
import { Movie } from './Movie';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  username: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => [Movie], { nullable: true })
  movies?: [Movie] | null;
}

@ObjectType()
export class UserWithToken {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
