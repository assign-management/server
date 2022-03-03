import { Resolvers, SectionResolvers } from '../types/generated/graphql';

export const mockSection = {
  id: 'tegwe',
  createdAt: 'new Date()',
  tasks: [],
  title: 'test',
  updatedAt: 'new Date()',
  projectId: 'ewgew',
};

export const sectionResolvers: Resolvers<SectionResolvers> = {
  Query: {
    sections: (_parent, { projectId }) => [],
  },
  Mutation: {
    createSection: async (_parent, { projectId, ...args }) => {
      return Promise.resolve(mockSection);
    },
    updateSection: async (_parent, { id, ...args }) => {
      return Promise.resolve(mockSection);
    },
    renameSection: async (_parent, { id, ...args }) => {
      return Promise.resolve(mockSection);
    },
    deleteSection: (_parent, { id }) => Promise.resolve(mockSection),
  },
};
