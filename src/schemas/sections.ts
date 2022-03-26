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

  input CreateSectionData {
    title: String!
    projectId: ID!
  }

  input UpdateSectionData {
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
    createSection(data: CreateSectionData!): SectionMutationResponse
    updateSection(id: String!, data: UpdateSectionData!): SectionMutationResponse
    deleteSection(id: ID!): SectionMutationResponse
  }
`;
