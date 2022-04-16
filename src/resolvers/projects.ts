import { ProjectResolvers, Resolvers } from '../types/generated/graphql';
import * as projectService from '../services/projects';

export const projectResolvers: Resolvers = {
  Query: {
    fetchProject: async (_, { id }) => projectService.fetchProject(id),
    fetchProjects: async (_, { args }, context, info) => projectService.fetchProjects(args),
  },
  Mutation: {
    createProject: async (_, { data }) => projectService.createProject(data),
    updateProject: async (_, { id, data }) => projectService.updateProject(id, data),
    deleteProject: (_, { id }) => projectService.deleteProject(id),
  },
};
