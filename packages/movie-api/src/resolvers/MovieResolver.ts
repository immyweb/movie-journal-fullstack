import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  InputType,
  Field,
  Int,
} from 'type-graphql';

import { Movie } from '../types/Movie';
import { SearchResults } from '../types/SearchResults';
import { Context } from '../context';
import { MovieCreateInput } from '../inputs/MovieInput';

@InputType()
export class PaginationInputType {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}

@Resolver(Movie)
export class MovieResolver {
  @Query(() => [Movie])
  async getAllMoviesByUser(
    @Arg('email') email: string,
    @Arg('query') query: string,
    @Ctx() ctx: Context
  ) {
    const result = await ctx.prisma.movie.findMany({
      where: {
        author: {
          email,
        },
        film: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    if (!result) {
      throw new Error('No movies found');
    }
    return result;
  }

  @Query(() => [Movie])
  async getMoviesByUser(
    @Arg('email') email: string,
    @Arg('query') query: string,
    @Arg('skip') skip: number,
    @Arg('take') take: number,
    @Ctx() ctx: Context
  ) {
    const result = await ctx.prisma.movie.findMany({
      skip,
      take,
      where: {
        author: {
          email,
        },
        film: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    if (!result) {
      throw new Error('No movies found');
    }
    return result;
  }

  @Query(() => Movie)
  async getMovieById(@Arg('id') id: string, @Ctx() ctx: Context) {
    return ctx.prisma.movie.findUnique({
      where: { id },
    });
  }

  @Query(() => [Movie])
  async searchUserMovies(@Arg('query') query: string, @Ctx() ctx: Context) {
    const result = await ctx.prisma.movie.findMany({
      where: {
        film: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });

    if (!result) {
      throw new Error('No movies found');
    }
    return result;
  }

  @Query(() => SearchResults)
  async searchMovies(@Arg('query') query: string, @Ctx() ctx: Context) {
    const movies = await ctx.dataSources.MovieDbApi.searchMovie(query);
    if (!movies) {
      throw new Error('No movies found');
    }

    return movies;
  }

  @Mutation(() => Movie)
  async createMovie(
    @Arg('data') data: MovieCreateInput,
    @Arg('authorEmail') authorEmail: string,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.movie.create({
      data: {
        dateWatched: data.dateWatched,
        film: data.film,
        review: data.review,
        rating: data.rating,
        like: data.like,
        author: {
          connect: { email: authorEmail },
        },
      },
    });
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Arg('data') data: MovieCreateInput,
    @Arg('id') id: string,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.movie.update({
      where: { id },
      data: {
        dateWatched: data.dateWatched,
        film: data.film,
        review: data.review,
        rating: data.rating,
        like: data.like,
      },
    });
  }

  @Mutation(() => Movie)
  async deleteMovie(@Arg('id') id: string, @Ctx() ctx: Context) {
    return ctx.prisma.movie.delete({
      where: { id },
    });
  }
}
