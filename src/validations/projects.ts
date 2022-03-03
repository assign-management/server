import { Knex } from 'knex';
import { Project } from '../types/project';
import { Accessibility, CreateProjectArgs, UpdateProjectArgs } from '../types/generated/graphql';
import { Validation } from '../utils/validation';

export const createProjectValidation = new Validation<CreateProjectArgs>({
  type: 'object',
  required: ['title', 'accessibility'],
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
    accessibility: {
      type: 'string',
      enum: Object.values(Accessibility),
    },
  },
});

export const updateProjectValidation = new Validation<UpdateProjectArgs>({
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
      nullable: true,
    },
    accessibility: {
      type: 'string',
      enum: Object.values(Accessibility),
      nullable: true,
    },
  },
});
