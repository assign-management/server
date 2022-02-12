import { gql } from 'apollo-server-core';

export const sectionSchemas = gql`
  type Section {
    title: String
    id: ID!
    createdAt: String
    updatedAt: String
    projectId: ID!
    tasks: [Task]
  }

  type Query {
    sections(projectId: ID!): [Section] @deprecated(reason: "will be included in getting a single project query")
  }

  type Mutation {
    createSection(projectId: ID!, title: String!): Section
    updateSection(id: ID!, title: String): Section
    deleteSection(id: ID!): Section
    renameSection(id: ID!, title: String): Section
  }
`;
