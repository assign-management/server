import { Resolvers, SectionResolvers } from '../types/generated/graphql';
import * as sectionsService from '../services/sections';

export const sectionResolvers: Resolvers = {
  Query: {
    fetchSections: (_parent, { projectId }) => sectionsService.fetchSections(projectId),
  },
  Mutation: {
    createSection: async (_parent, { data }) => sectionsService.createSection(data),
    updateSection: async (_parent, { id, data }) => sectionsService.updateSection(id, data),
    deleteSection: (_parent, { id }) => sectionsService.deleteSection(id),
  },
};
