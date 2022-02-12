import { Resolvers, TaskResolvers } from '../generated/graphql';

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
    createTask: async (_parent, { sectionId, ...args }) => Promise.resolve(mockTask),
    setTaskDueDate: (_parent, { id, ...args }) => Promise.resolve(mockTask),
    renameTask: async (_parent, { id, ...args }) => Promise.resolve(mockTask),
  },
};
