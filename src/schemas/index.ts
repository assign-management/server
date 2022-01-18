import { gql } from 'apollo-server-core';
import { projects } from './projects';

const users = gql`
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

const typeDefs = [users, projects];

export default typeDefs;
