import { CreateTaskArgs, UpdateTaskArgs } from '../types/generated/graphql';
import { Validation } from '../utils/validation';
import { UUIDValidation } from './common';

export const createTaskValidation = new Validation<CreateTaskArgs>({
  type: 'object',
  required: ['title', 'sectionId'],
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
    sectionId: {
      type: 'string',
      format: 'uuid',
    },
  },
});

export const createTaskArrayValidation = new Validation<Array<CreateTaskArgs>>({
  type: 'array',
  items: createTaskValidation.schema,
});

export const updateTaskValidation = new Validation<UpdateTaskArgs>({
  type: 'object',
  required: ['id'],
  properties: {
    id: UUIDValidation.schema,
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
      nullable: true,
    },
    description: {
      type: 'string',
      nullable: true,
    },
    dueDate: {
      type: 'string',
      nullable: true,
    },
  },
});
