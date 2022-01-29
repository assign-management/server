import _ from 'lodash';
import { ProjectResolvers, Resolvers, UserResolvers } from '../generated/graphql';
import { ProjectRepository } from '../repositories';
import { Accessibility } from '../utils/constants';

const users: Resolvers<UserResolvers> = {
  Query: {
    profile: () => ({
      id: 'ID!',
      email: 'String',
      name: 'String',
      token: 'String',
    }),
  },
};

const projects: Resolvers<ProjectResolvers> = {
  Query: {
    project: async (_, id) => ProjectRepository.findById(id),
    projects: async (_, args) => ProjectRepository.find(args),
  },
  Mutation: {
    createProject: async (_, { args }) => {
      const project = await ProjectRepository.create(args);
      return { code: '201', success: true, message: 'User email was successfully updated', project };
    },
  },
};

const query = {};

const resolvers: Resolvers = _.merge(
  {},
  users,
  projects,
  // resolversA, resolversB
);

export default resolvers;
