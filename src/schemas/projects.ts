import { gql } from 'apollo-server-core';

export const projects = gql`
  """
  This enum stand for who can see the Project:
  """
  enum Accessibility {
    "Only the current User."
    PRIVATE
    "Only the team members of the project and the current user."
    TEAM
    "Everyone can see the project"
    PUBLIC
  }

  type Project {
    """
    support markdown language
    Description for field
    Supports **multi-line** description for your [API](http://example.com)!
    """
    id: ID!
    title: String!
    accessibility: Accessibility!
    createdAt: String!
    updatedAt: String!
  }

  input CreateProjectArgs {
    title: String!
    accessibility: Accessibility
  }

  type CreateProjectMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    project: Project
  }

  type Query {
    project("Description for argument" id: ID!): Project
    projects(skip: Int, take: Int): [Project]
  }
  type Mutation {
    createProject(args: CreateProjectArgs!): CreateProjectMutationResponse
  }
`;
