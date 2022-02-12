import { gql } from 'apollo-server-core';

export const userSchemas = gql`
  type User {
    id: ID!
    email: String!
    name: String!
    token: String
  }

  type Query {
    profile: User
  }

  type Mutation {
    login(email: String, password: String): User
    registration(email: String, password: String, name: String): User
  }
`;
