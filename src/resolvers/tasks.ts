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

export const taskResolvers: Resolvers<TaskResolvers> = {
  Query: {},
  Mutation: {
    createTask: async (_parent, { args }) => tasksService.createTask(args),
    deleteTask: (_parent, { id }) => tasksService.deleteTask(id),
    updateTask: async (_parent, { args }) => tasksService.updateTask(args),
  },
};
