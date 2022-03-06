import { gql } from 'apollo-server-core';

export const projectSchemas = gql`
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
    # owner: String
    createdAt: Date!
    updatedAt: Date!
    "fail on creation because not exit yet"
    sections: [Section]
  }

  input CreateProjectArgs {
    title: String!
    accessibility: Accessibility!
  }

  input UpdateProjectArgs {
    title: String
    accessibility: Accessibility
  }
  
  type ProjectMutationResponse implements MutationResponse {
    status: MutationStatus!
    project: Project
  }

  type ProjectsResponse implements ListResponse {
    total: Int!
    projects: [Project!]!
  }

  type Query {
    fetchProject("Description for argument" id: ID!): Project
    fetchProjects(args: PaginationArgs!): ProjectsResponse
  }
  type Mutation {
    createProject(data: CreateProjectArgs!): ProjectMutationResponse
    updateProject(id: ID!, data: UpdateProjectArgs!): ProjectMutationResponse
    deleteProject(id: ID!): ProjectMutationResponse
  }
`;
