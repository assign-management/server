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

  input CreateTaskArgs {
    title: String!
    sectionId: ID!
  }

  input UpdateTaskArgs {
    id: ID!
    title: String
    dueDate: Date
    description: String
  }

  type TaskMutationResponse implements MutationResponse {
    status: MutationStatus!
    task: Task
  }

  type Query {
    task(id: ID!): Task
  }

  type Mutation {
    createTask(args: CreateTaskArgs!): TaskMutationResponse
    updateTask(args: UpdateTaskArgs!): TaskMutationResponse
    deleteTask(id: ID!): TaskMutationResponse
  }
`;
