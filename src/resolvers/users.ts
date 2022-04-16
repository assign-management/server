import { Resolvers } from '../types/generated/graphql';
import * as usersService from '../services/users';
import passport from 'passport';

export const userResolvers: Resolvers = {
  Query: {
    profile: () => usersService.profile(),
  },
  Mutation: {
    login: (_parent, { data }) => usersService.login(data),
    registration: async (_parent, { data }, context, info) => {
      const user = await usersService.registration(data);
      context.req.session = { token: user.user!.token };
      context.res.header('Authorization', `Bearer ${user.user!.token}`);
      return user;
    },
  },
};
