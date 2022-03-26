import { Validation } from '../utils/validation';

export const UUIDValidation = new Validation<string>({
  type: 'string',
  format: 'uuid',
});
