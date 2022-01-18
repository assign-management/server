import _ from 'lodash';

const users = {
  Query: {
    profile: () => ({
      id: 'ID!',
      email: 'String',
      name: 'String',
      token: 'String',
    }),
  },
};

const projects = {
  Query: {
    projects: () => [
      {
        id: 'ID!',
        title: 'String!',
        createdAt: 'String!',
        updatedAt: 'String!',
      },
    ],
  },
};

const query = {};

const resolvers = _.merge(
  {},
  users,
  projects,
  // resolversA, resolversB
);

export default resolvers;
