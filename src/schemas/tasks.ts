import { gql } from 'apollo-server-core';

export const taskSchemas = gql`
  type Task {
    title: String
    id: ID!
    createdAt: String
    updatedAt: String
    sectionId: ID!
  }

  type Query {
    task(id: ID): Task
  }

  type Mutation {
    createTask(sectionId: ID!, title: String!): Task
    setTaskDueDate(id: ID!, dueDate: String): Task
    renameTask(id: ID!, title: String): Task
    updateTask(title: String): Task
    deleteTask(id: ID!): Task
  }
`;
