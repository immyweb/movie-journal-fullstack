import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';
import * as tq from 'type-graphql';
import { Context, context } from './context';
import { MovieResolver } from './resolvers/MovieResolver';
import { UserResolver } from './resolvers/UserResolver';
import { MovieCreateInput } from './inputs/MovieInput';
// import { commonLibrary } from '@movie-journal-fullstack/common-library';

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [MovieResolver, UserResolver, MovieCreateInput],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
    validate: { forbidUnknownValues: false },
  });

  const server = new ApolloServer<Context>({ schema });

  const { url } = await startStandaloneServer(server, {
    context: async () => context,
  });

  console.log(`🚀 Server ready at: ${url}`);
};

app();
