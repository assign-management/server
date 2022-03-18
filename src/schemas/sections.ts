import { gql } from 'apollo-server-core';

export const sectionSchemas = gql`
  type Section {
    title: String
    id: ID!
    createdAt: Date!
    updatedAt: Date!
    projectId: ID!
    tasks: [Task]
  }

  type SectionsResponse implements ListResponse {
    total: Int!
    sections: [Section!]!
  }

  input CreateSectionArgs {
    title: String!
    projectId: ID!
  }

  input UpdateSectionArgs {
    title: String
    projectId: ID
  }

  type SectionMutationResponse implements MutationResponse {
    status: MutationStatus!
    section: Section
  }

  type Query {
    fetchSections(projectId: ID!): SectionsResponse
  }

  type Mutation {
    createSection(args: CreateSectionArgs!): SectionMutationResponse
    updateSection(id: ID!, args: UpdateSectionArgs): SectionMutationResponse
    deleteSection(id: ID!): SectionMutationResponse
    # renameSection(id: ID!, title: String): Section
  }
`;
