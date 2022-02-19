import Ajv, { DefinedError, JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { UserInputError } from 'apollo-server-core';

export const ajv = addFormats(new Ajv({ allErrors: true }));

interface Props<T> {
  schema: JSONSchemaType<T>;
}

export type ValidateFunction = (data: unknown) => void;

export const generateModelValidation = <T>({ schema }: Props<T>): ValidateFunction => {
  const validate = ajv.compile<T>(schema);
  return (data) => {
    if (!validate(data)) {
      // The type cast is needed, as Ajv uses a wider type to allow extension
      // You can extend this type to include your error types as needed.
      for (const err of validate.errors as DefinedError[]) {
        switch (err.keyword) {
          case 'type':
            // err type is narrowed here to have "type" error params properties
            console.log(err.params.type);
            break;
        }
      }
      const [firstError] = validate.errors as DefinedError[];
      throw new UserInputError(firstError.message as string);
    }
  };
};

export interface ValidationFunctions {
  [key: string]: ValidateFunction;
}
