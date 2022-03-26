import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { Accessibility, CreateProjectData } from '../../types/generated/graphql';
import { createProjectArrayValidation, createProjectValidation } from '../../validations';

const GENERATE_PROJECTS_DEFAULT_AMOUNT = 2;

export const generateProjectArgs = (): CreateProjectData => {
  const projectArgs = {
    title: faker.name.title(),
    accessibility: _.sample(Object.values(Accessibility)),
  };
  createProjectValidation.validate(projectArgs);
  return projectArgs as CreateProjectData;
};

export const generateProjectArgsArray = (length: number = GENERATE_PROJECTS_DEFAULT_AMOUNT): CreateProjectData[] => {
  const projectsArgs = Array.from({ length }, () => generateProjectArgs());
  createProjectArrayValidation.validate(projectsArgs);
  return projectsArgs;
};
