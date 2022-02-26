import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { Accessibility } from '../../generated/graphql';

export const createProjectArgsMock = () => ({
  title: faker.name.title(),
  accessibility: _.sample(Object.values(Accessibility)),
});
