import { Resolvers, SectionResolvers } from '../types/generated/graphql';
import * as sectionsService from '../services/sections';

export const sectionResolvers: Resolvers<SectionResolvers> = {
  Query: {
    fetchSections: () => sectionsService.fetchSections(),
  },
  Mutation: {
    createSection: async (_parent, { args }) => sectionsService.createSection(args),
    updateSection: async (_parent, { id, args }) => sectionsService.updateSection(id, args),
    deleteSection: (_parent, { id }) => sectionsService.deleteSection(id),
  },
};
