import { faker } from '@faker-js/faker';
import { Accessibility } from '../types/generated/graphql';

export const mockSection = (id: string) => ({
  id: faker.datatype.uuid(),
  createdAt: faker.date.recent().toISOString(),
  tasks: [],
  title: faker.name.title(),
  updatedAt: faker.date.recent().toISOString(),
  projectId: id,
});
