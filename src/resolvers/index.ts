import _ from 'lodash';
import { Resolvers } from '../types/generated/graphql';
import { commonResolvers } from './common';
import { projectResolvers } from './projects';
import { sectionResolvers } from './sections';
import { taskResolvers } from './tasks';
import { userResolvers } from './users';

const resolvers: Resolvers = _.merge(
  {},
  commonResolvers,
  userResolvers,
  projectResolvers,
  sectionResolvers,
  taskResolvers,
);

export default resolvers;
