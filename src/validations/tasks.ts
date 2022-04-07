import { CreateTaskData, UpdateTaskData } from '../types/generated/graphql';
import { Validation } from '../utils/validation';

export const createTaskValidation = new Validation<CreateTaskData>({
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

export const createTaskArrayValidation = new Validation<Array<CreateTaskData>>({
  type: 'array',
  items: createTaskValidation.schema,
});

export const updateTaskValidation = new Validation<UpdateTaskData>({
  type: 'object',
  properties: {
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
      type: 'object',
      format: 'date-time',
      nullable: true,
    },
  },
});
