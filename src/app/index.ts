import { ApolloError, ApolloServer, ServerInfo, UserInputError } from 'apollo-server';
import { imagesResolvers, imagesTypeDefs } from '../modules/images/graphql';
import { connect } from '../database';
import { IDatabaseProvider } from '../database';
import { ValidationError } from 'yup';
import { GraphQLError } from 'graphql';

export const startApp = async () => {
  try {
    const database = await connect();
    const { url } = await createGraphQLServer(database);
    console.log(`🚀  Server ready at ${url}`);

  } catch (e) {
    console.log(e);
  }
};

const createGraphQLServer = async (database: IDatabaseProvider): Promise<ServerInfo> => {
  const typeDefs = imagesTypeDefs;
  const resolvers = imagesResolvers;
  const config = {
    debug: false,
    typeDefs,
    resolvers,
    context: async () => {
      return { db: database };
    },
    formatError: function (error: GraphQLError) {
      if (!(error instanceof ApolloError)) {
        if (error.originalError instanceof ValidationError) {
          return new UserInputError(error.message, error.extensions);
        } else {
          return new ApolloError('Internal Server Error');
        }
      }

      return error;
    },
  };
  const server = new ApolloServer(config);

  return await server.listen();
};
