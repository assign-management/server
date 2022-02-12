import { ProjectResolvers, Resolvers } from '../generated/graphql';
import { ProjectRepository } from '../repositories';
import { ProjectServices } from '../services/projects';
import { mockSection } from './sections';

export const projectResolvers: Resolvers<ProjectResolvers> = {
  Query: {
    getProject: async (_, { id }) => ProjectServices.getProject(id),
    getProjects: async (_, { args }, context, info) => {
      console.log('info', info);

      return ProjectServices.getProjects(args);
    },
  },
  Mutation: {
    createProject: async (_, { data }) => ProjectServices.createProject(data),
    updateProject: async (_, { id, data }) => ProjectServices.updateProject(id, data),
    deleteProject: (_, { id }) => ProjectServices.deleteProject(id),
    // },
    // Project: {
    //   sections: ({ id }, __args) => [mockSection],
  },
};
