import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { Accessibility } from '../../types/generated/graphql';

export const createProjectArgsMock = () => ({
  title: faker.name.title(),
  accessibility: _.sample(Object.values(Accessibility)),
});
