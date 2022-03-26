import { faker } from '@faker-js/faker';
import _ from 'lodash';
import { CreateTaskData } from '../../types/generated/graphql';
import { createTaskArrayValidation, createTaskValidation } from '../../validations/tasks';

const GENERATE_TASKS_DEFAULT_AMOUNT = 2;

export const generateTaskArgs = (sectionId: string): CreateTaskData => {
  const taskArgs = {
    title: faker.name.title(),
    sectionId,
  };
  createTaskValidation.validate(taskArgs);
  return taskArgs as CreateTaskData;
};

export const generateTaskArgsArray = (
  sectionId: string,
  length: number = GENERATE_TASKS_DEFAULT_AMOUNT,
): CreateTaskData[] => {
  const sectionsArgs = Array.from({ length }, () => generateTaskArgs(sectionId));
  createTaskArrayValidation.validate(sectionsArgs);
  return sectionsArgs;
};
