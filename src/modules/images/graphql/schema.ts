import { gql } from 'apollo-server';

export const imagesTypeDefs = gql`
  scalar JSON
  scalar JSONObject
  scalar ValidateString
  scalar ValidateNumber
  
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
  
  type Mutation {
    createImage(input: ImageInput!): PresignedPost
    markImageAsUploaded(input: MarkImageAsUploadedInput!): Boolean
  }
  
  type Query {
    _dummy: String
  }
`;
