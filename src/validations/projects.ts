import { projectRepository } from '../repositories';
import { Accessibility, CreateProjectData, PaginationArgs, UpdateProjectData } from '../types/generated/graphql';
import { Validation } from '../utils/validation';

export const createProjectValidation = new Validation<CreateProjectData>({
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

export const createProjectArrayValidation = new Validation<Array<CreateProjectData>>({
  type: 'array',
  items: createProjectValidation.schema,
});

export const updateProjectValidation = new Validation<UpdateProjectData>({
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
