import { gql } from 'apollo-server-core';

export const taskSchemas = gql`
  type Task {
    id: ID!
    title: String!
    order: Int
    dueDate: Date
    description: String
    sectionId: ID!
    createdAt: Date!
    updatedAt: Date!
  }

  input CreateTaskData {
    title: String!
    sectionId: ID!
  }

  input UpdateTaskData {
    title: String
    dueDate: Date
    description: String
  }

  type TaskMutationResponse implements MutationResponse {
    status: MutationStatus!
    task: Task!
  }

  type Query {
    fetchTask(id: ID!): Task
  }

  type Mutation {
    createTask(data: CreateTaskData!): TaskMutationResponse!
    updateTask(id: ID!, data: UpdateTaskData!): TaskMutationResponse!
    deleteTask(id: ID!): TaskMutationResponse!
  }
`;
