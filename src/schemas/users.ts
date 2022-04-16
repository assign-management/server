import { gql } from 'apollo-server-core';

export const userSchemas = gql`
  enum Role {
    ADMIN
    MODERATOR
    MEMBER
  }

  type User {
    id: ID!
    name: String!
    email: String!
    # password: String
    role: Role!
    image: String
    # resetToken: String
    # resetTokenExpires: String
    createdAt: Date!
    updatedAt: Date!
  }

  type UserPayload {
    id: ID!
    name: String!
    email: String!
    token: String!
  }

  input CreateUserData {
    email: String!
    password: String!
    name: String
  }

  input LoginData {
    email: String!
    password: String!
  }

  type UserMutationResponse implements MutationResponse {
    status: MutationStatus!
    user: UserPayload
  }

  type Query {
    profile: User
  }

  type Mutation {
    login(data: LoginData!): UserMutationResponse!
    registration(data: CreateUserData!): UserMutationResponse!
  }
`;
