import { GraphQLError } from 'graphql';
import { ApolloError, UserInputError } from 'apollo-server-errors';
import yup from 'yup';

export const formatError = (error: GraphQLError) => {
  if (!(error instanceof ApolloError)) {
    if (error.originalError instanceof yup.ValidationError) {
      return new UserInputError(error.message, error.extensions);
    } else {
      return new ApolloError('Internal Server Error');
    }
  }

  return error;
};
