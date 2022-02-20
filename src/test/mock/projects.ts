import { faker } from '@faker-js/faker';
import { Accessibility } from '../../generated/graphql';

export const createProjectArgsMock = {
  title: faker.name.title(),
  accessibility: Accessibility.Public,
};
