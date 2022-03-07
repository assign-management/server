import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { Accessibility, CreateProjectArgs } from '../../types/generated/graphql';
import { createProjectArrayValidation, createProjectValidation } from '../../validations';

const GENERATE_PROJECTS_DEFAULT_AMOUNT = 2;

export const generateProjectArgs = (): CreateProjectArgs => {
  const projectArgs = {
    title: faker.name.title(),
    accessibility: _.sample(Object.values(Accessibility)),
  };
  createProjectValidation.validate(projectArgs);
  return projectArgs as CreateProjectArgs;
};

export const generateProjectArgsArray = (length: number = GENERATE_PROJECTS_DEFAULT_AMOUNT): CreateProjectArgs[] => {
  const projectsArgs = Array.from({ length }, () => generateProjectArgs());
  createProjectArrayValidation.validate(projectsArgs);
  return projectsArgs;
};
