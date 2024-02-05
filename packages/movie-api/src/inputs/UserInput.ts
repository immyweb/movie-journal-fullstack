import 'reflect-metadata';
import { InputType, Field } from 'type-graphql';
// import { MovieCreateInput } from './MovieInput';

@InputType()
export class UserCreateInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
