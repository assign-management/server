import { gql } from 'apollo-server-core';

export const sectionSchemas = gql`
  type Section {
    title: String!
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
    id: ID!
    title: String
  }

  type SectionMutationResponse implements MutationResponse {
    status: MutationStatus!
    section: Section
  }

  type Query {
    fetchSections(projectId: ID!): SectionsResponse
  }

  type Mutation {
    createSection(data: CreateSectionArgs!): SectionMutationResponse
    updateSection(args: UpdateSectionArgs!): SectionMutationResponse
    deleteSection(id: ID!): SectionMutationResponse
  }
`;
