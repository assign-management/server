import { projectRepository } from '../repositories';
import { PaginationArgs } from '../types/generated/graphql';
import { Validation } from '../utils/validation';

export const UUIDValidation = new Validation<string>({
  type: 'string',
  format: 'uuid',
});

export const paginationParamValidation = new Validation<PaginationArgs>({
  type: 'object',
  additionalProperties: false,
  properties: {
    offset: {
      type: 'number',
      nullable: true,
    },
    limit: {
      type: 'number',
      nullable: true,
    },
    filter: {
      nullable: true,
      type: 'array',
      items: {
        required: ['value', 'field'],
        type: 'object',
        properties: {
          field: {
            type: 'string',
            enum: Object.values(projectRepository?.returnedColumns ?? []),
          },
          value: {
            type: 'string',
          },
        },
      },
    },
  },
});
