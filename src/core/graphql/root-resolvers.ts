import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';

export const RootResolvers = {
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
  Query: {
    _dummy: () => {
      return 'success';
    }
  },
  Mutation: {
    _dummy: () => {
      return 'success';
    }
  },
};
