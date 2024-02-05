import 'reflect-metadata';
import { ObjectType, Field, Int } from 'type-graphql';

@ObjectType()
export class SearchResults {
  @Field(() => Int)
  page: number;

  @Field(() => [Result])
  results: [Result];

  @Field(() => Int)
  total_pages: number;

  @Field(() => Int)
  total_results: number;
}

@ObjectType()
export class Result {
  @Field(() => Boolean)
  adult: boolean;

  @Field(() => String)
  backdrop_path: string;

  @Field(() => [Int])
  genre_ids: number[];

  @Field(() => Int)
  id: number;

  @Field(() => String)
  original_language: string;

  @Field(() => String)
  original_title: string;

  @Field(() => String)
  overview: string;

  @Field(() => Int)
  popularity: number;

  @Field(() => String, { nullable: true })
  poster_path: null | string;

  @Field(() => String, { nullable: true })
  release_date?: string;

  @Field(() => String)
  title: string;

  @Field(() => Boolean)
  video: boolean;

  @Field(() => Int)
  vote_average: number;

  @Field(() => Int)
  vote_count: number;
}
