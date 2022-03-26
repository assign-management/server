import { CreateSectionArgs, UpdateSectionArgs } from '../types/generated/graphql';
import { Validation } from '../utils/validation';
import { UUIDValidation } from './common';

export const createSectionValidation = new Validation<CreateSectionArgs>({
  type: 'object',
  required: ['title', 'projectId'],
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
    projectId: {
      type: 'string',
      format: 'uuid',
    },
  },
});

export const createSectionArrayValidation = new Validation<Array<CreateSectionArgs>>({
  type: 'array',
  items: createSectionValidation.schema,
});

export const updateSectionValidation = new Validation<UpdateSectionArgs>({
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
  },
});
