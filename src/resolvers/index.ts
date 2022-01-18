import _ from 'lodash';
import { Accessability, ProjectResolvers, Resolvers, UserResolvers } from '../generated/graphql';
import projectRepo from '../repos/project-repo';
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
    projects: () => [
      {
        accessability: Accessability.Public,
        id: 'twgwrg',
        createdAt: 'wegegw',
        title: 'gwegew',
        updatedAt: 'fwegew',
      },
    ],
  },
  Mutation: {
    createProject: async (parent, args) => {
      const project = await projectRepo.create(args);
      console.log('project', project);

      return {
        accessability: Accessability.Public,
        id: 'twgwrg',
        createdAt: 'wegegw',
        title: 'gwegew',
        updatedAt: 'fwegew',
      };
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
