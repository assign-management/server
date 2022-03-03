import { Resolvers, UserResolvers } from '../types/generated/graphql';

const userMock = Promise.resolve({
  email: 'test',
  id: 'test',
  name: 'test',
  token: 'test',
});

export const userResolvers: Resolvers<UserResolvers> = {
  Query: {
    profile: () => ({
      id: 'ID!',
      email: 'String',
      name: 'String',
      token: 'String',
    }),
  },
  Mutation: {
    login: () => userMock,
    registration: () => {
      return userMock;
    },
  },
};
