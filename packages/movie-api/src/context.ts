import { PrismaClient } from '@prisma/client';
import MovieDbApi from './datasources/theMovieDbAPI';

const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  dataSources: {
    MovieDbApi: MovieDbApi;
  };
}

export const context: Context = {
  prisma: prisma,
  dataSources: {
    MovieDbApi: new MovieDbApi(),
  },
};
