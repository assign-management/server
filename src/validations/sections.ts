import { CreateSectionData, UpdateSectionData } from '../types/generated/graphql';
import { Validation } from '../utils/validation';

export const createSectionValidation = new Validation<CreateSectionData>({
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

export const createSectionArrayValidation = new Validation<Array<CreateSectionData>>({
  type: 'array',
  items: createSectionValidation.schema,
});

export const updateSectionValidation = new Validation<UpdateSectionData>({
  type: 'object',
  properties: {
    title: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
      nullable: true,
    },
  },
});
