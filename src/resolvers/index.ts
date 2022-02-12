import _ from 'lodash';
import { Resolvers } from '../generated/graphql';
import { commonResolvers } from './common';
import { projectResolvers } from './projects';
import { userResolvers } from './users';

const resolvers: Resolvers = _.merge(
  {},
  commonResolvers,
  userResolvers,
  projectResolvers,
  // resolversA, resolversB
);

export default resolvers;
