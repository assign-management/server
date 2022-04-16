import { Resolvers, TaskResolvers } from '../types/generated/graphql';
import * as tasksService from '../services/tasks';

const mockTask = {
  id: 'test',
  sectionId: 'test',
  createdAt: 'test',
  updatedAt: 'test',
  title: 'test',
  tasks: [],
};

export const taskResolvers: Resolvers = {
  Query: {
    fetchTask: async (_, { id }) => tasksService.fetchTask(id),
  },
  Mutation: {
    createTask: async (_parent, { data }) => tasksService.createTask(data),
    deleteTask: (_parent, { id }) => tasksService.deleteTask(id),
    updateTask: async (_parent, { id, data }) => tasksService.updateTask(id, data),
  },
};
