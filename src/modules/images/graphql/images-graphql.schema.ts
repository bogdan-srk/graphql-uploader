import { gql } from 'apollo-server';

export const ImagesSchema = gql`
    type UrlData {
    url: String
  }

  type PresignedPost {
    url: String
    fields: JSONObject
  }

  input ImageInput {
    filename: String!
    mimeType: String!
    size: Int!
    height: Int!
    width: Int!
  }

  input MarkImageAsUploadedInput {
    imageId: String!
  }

  extend type Mutation {
    createImage(input: ImageInput!): PresignedPost
    markImageAsUploaded(input: MarkImageAsUploadedInput!): Boolean
  }
`;
