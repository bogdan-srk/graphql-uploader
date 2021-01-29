import { ApolloServer, makeExecutableSchema, ServerInfo } from 'apollo-server';
import { IDatabaseProvider } from '../database';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import { formatError } from './formatError';
import { IResolverContext } from './graphql.types';
import { RootResolvers } from './root-resolvers';
import { RootSchema } from './root-schema';
import { IServiceProvider } from '../service';

export * from './graphql.types';

export const createGraphQLServer = async (
  database: IDatabaseProvider,
  service: IServiceProvider,
  typeDefs: any[],
  resolvers: any[],
): Promise<ServerInfo> => {
  const config = {
    schema: genSchema(typeDefs, resolvers),
    formatError,
    context: async (): Promise<IResolverContext> => {
      return {
        database,
        service,
      };
    },
  };
  const server = new ApolloServer(config);

  return await server.listen();
};


const genSchema = (typeDefs: any[], resolvers: any[]) => {

  return makeExecutableSchema({
    typeDefs: mergeTypes([RootSchema, ...typeDefs]),
    resolvers: mergeResolvers([RootResolvers, ...resolvers]),
  })
};
