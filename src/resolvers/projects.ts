import { ProjectResolvers, Resolvers } from '../generated/graphql';
import { projectRepository } from '../repositories';
import { ProjectServices } from '../services/projects';
import { mockSection } from './sections';

export const projectResolvers: Resolvers<ProjectResolvers> = {
  Query: {
    fetchProject: async (_, { id }) => ProjectServices.fetch(id),
    fetchProjects: async (_, { args }, context, info) => {
      console.log('info', info);

      return ProjectServices.fetchProjects(args);
    },
  },
  Mutation: {
    createProject: async (_, { data }) => ProjectServices.create(data),
    updateProject: async (_, { id, data }) => ProjectServices.update(id, data),
    deleteProject: (_, { id }) => ProjectServices.delete(id),
    // },
    // Project: {
    //   sections: ({ id }, __args) => [mockSection],
  },
};
