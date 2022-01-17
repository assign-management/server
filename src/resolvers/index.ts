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

const query = {};

const resolvers = _.merge(
  {},
  users,
  // resolversA, resolversB
);

export default resolvers;
