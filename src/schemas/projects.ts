import { gql } from 'apollo-server-core';

export const projects = gql`
  """
  This enum stand for who can see the Project:
  """
  enum Accessability {
    "Only the current User."
    PRIVATE
    "Only the team members of the project and the current user."
    TEAM
    "Everyone can see the project"
    PUBLIC
  }

  type Project {
    id: ID!
    title: String!
    accessability: Accessability!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    projects: [Project!]!
  }

  type Mutation {
    createProject(title: String!, accessability: Accessability): Project
  }
`;
