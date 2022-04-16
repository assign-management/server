import { Resolvers, User } from '../types/generated/graphql';
import * as usersService from '../services/users';
import passport from 'passport';

// TODO: omit credentials from user response
export const userResolvers: Resolvers = {
  Query: {
    profile: (_parent, _args, { user }) => user as User,
  },
  Mutation: {
    login: (_parent, { data }) => usersService.login(data),
    registration: async (_parent, { data }, context, info) => {
      const user = await usersService.registration(data);
      context.req.session = { passport: { user: user.user!.token } };
      context.res.header('Authorization', `Bearer ${user.user!.token}`);
      return user;
    },
  },
};
