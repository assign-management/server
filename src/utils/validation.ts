import Ajv, { DefinedError, JSONSchemaType, ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
import { UserInputError } from 'apollo-server-core';

const ajv = addFormats(new Ajv({ allErrors: true }));
export class Validation<T> {
  validateFunction: ValidateFunction<T>;

  constructor(private readonly jsonSchema: JSONSchemaType<T>) {
    this.validateFunction = ajv.compile<T>(jsonSchema);
  }

  public get schema(): JSONSchemaType<T> {
    return this.jsonSchema;
  }

  validate(data: unknown) {
    if (!this.validateFunction(data)) {
      // The type cast is needed, as Ajv uses a wider type to allow extension
      // You can extend this type to include your error types as needed.
      const errors: DefinedError[] = this.validateFunction.errors as DefinedError[];
      for (const err of errors) {
        switch (err.keyword) {
          case 'type':
            // err type is narrowed here to have "type" error params properties
            break;
        }
      }
      const [{ message, instancePath }] = errors;
      if (message) {
        const argumentName = instancePath.replace('/', '');
        throw new UserInputError(`${argumentName} ${message}`, {
          argumentName,
        });
      }
    }
  }
}
