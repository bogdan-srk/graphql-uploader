import { gql } from 'apollo-server-core';

export const RootSchema = gql`
    scalar JSON
    scalar JSONObject
    
    type Mutation {
        _dummy: String
    }

    type Query {
        _dummy: String
    }
`;
