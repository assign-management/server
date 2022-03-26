import { Resolvers, SectionResolvers } from '../types/generated/graphql';
import * as sectionsService from '../services/sections';

export const sectionResolvers: Resolvers<SectionResolvers> = {
  Query: {
    fetchSections: (_parent, { projectId }) => sectionsService.fetchSections(projectId),
  },
  Mutation: {
    createSection: async (_parent, { args }) => sectionsService.createSection(args),
    updateSection: async (_parent, { args }) => sectionsService.updateSection(args),
    deleteSection: (_parent, { id }) => sectionsService.deleteSection(id),
  },
};
