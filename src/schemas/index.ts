import { gql } from 'apollo-server-core';

const users = gql`
  type User {
    id: ID!
    email: String
    name: String
    token: String
  }

  type Query {
    profile: User
  }
`;

const typeDefs = [users];

export default typeDefs;
