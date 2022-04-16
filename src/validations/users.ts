import { CreateUserData, LoginData } from '../types/generated/graphql';
import { OauthPayload } from '../types/user';
import { Validation } from '../utils/validation';
import { emailValidation } from './common';

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
    email: emailValidation.schema,
    password: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
    },
  },
});

export const oauthRegistrationValidation = new Validation<OauthPayload>({
  type: 'object',
  required: ['email', 'provider'],
  additionalProperties: false,
  properties: {
    email: emailValidation.schema,
    provider: {
      type: 'string',
    },
    image: {
      type: 'string',
      nullable: true,
      minLength: 1,
      maxLength: 255,
    },
    name: {
      type: 'string',
      nullable: true,
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
