import { ApolloServer, ApolloServerExpressConfig } from "apollo-server-express";

export const createGraphQLServer = (config: ApolloServerExpressConfig): ApolloServer => {
  return new ApolloServer(config);
};
