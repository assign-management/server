import { CreateUserData, LoginData } from '../types/generated/graphql';
import { Validation } from '../utils/validation';

export const createUserValidation = new Validation<CreateUserData>({
  type: 'object',
  required: ['email', 'password'],
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
      nullable: true,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
  },
});

export const loginValidation = new Validation<LoginData>({
  type: 'object',
  required: ['email', 'password'],
  additionalProperties: false,
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
  },
});

export const createUserArrayValidation = new Validation<Array<CreateUserData>>({
  type: 'array',
  items: createUserValidation.schema,
});
