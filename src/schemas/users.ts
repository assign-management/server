import { gql } from 'apollo-server-core';

export const users = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    token: String!
  }

  type Query {
    profile: User
  }
`;
