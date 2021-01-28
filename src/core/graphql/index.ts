import { ApolloServer, makeExecutableSchema, ServerInfo } from 'apollo-server';
import { IDatabaseProvider } from '../database';
import { mergeResolvers, mergeTypes } from 'merge-graphql-schemas'
import { formatError } from './formatError';
import { IResolverContext } from './graphql.types';
import * as path from 'path';
import { readFileSync } from 'fs';
import glob from 'glob';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { imagesResolvers, imagesTypeDefs } from '../../modules/images/graphql';

export * from './graphql.types';

export const createGraphQLServer = async (
  database: IDatabaseProvider,
  // typeDefs: any,
  // resolvers: any,
): Promise<ServerInfo> => {
  const typeDefs = imagesTypeDefs;
  const resolvers = imagesResolvers;
  const config = {
    debug: false,
    typeDefs,
    resolvers,
    // schema: genSchema(),
    formatError,
    context: async (): Promise<IResolverContext> => {
      return {
        database,
      };
    },
  };
  const server = new ApolloServer(config);

  return await server.listen();
};


export const genSchema = () => {
  const modulesPath = path.join(__dirname, '../../modules');
  const types = glob
    .sync(`${ modulesPath }/**/*.graphql`)
    .map(file => readFileSync(file, { encoding: 'utf8' }));
  const resolvers = glob
    .sync(`${ modulesPath }/**/resolvers.?s`)
    .map(file => require(file).resolvers);
  resolvers.push({
      JSON: GraphQLJSON,
      JSONObject: GraphQLJSONObject,
  });

  return makeExecutableSchema({
    typeDefs: mergeTypes(types),
    resolvers: mergeResolvers(resolvers),
  })
};
