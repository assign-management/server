import { Knex } from 'knex';
import { Project } from '../@types/project';
import { Accessibility, CreateProjectArgs } from '../generated/graphql';
import { RepositoryValidationFunctions } from '../utils/repository';
import { generateModelValidation } from '../utils/validation';

export const projectsValidation: RepositoryValidationFunctions = {
  where: generateModelValidation<Knex.Where<Project>>({
    schema: {
      type: 'object',
      additionalProperties: false,
      properties: {
        id: {
          type: 'string',
          format: 'uuid',
          nullable: true,
        },
      },
    },
  }),
  create: generateModelValidation<CreateProjectArgs>({
    schema: {
      type: 'object',
      additionalProperties: false,
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
    },
  }),
  update: generateModelValidation<Partial<CreateProjectArgs>>({
    schema: {
      type: 'object',
      additionalProperties: false,
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
    },
  }),
};
