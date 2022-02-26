import { Validation } from '../validation';

interface SchemaWithTitle {
  title: string;
}

it("should throw error if data don't match schema", () => {
  const randomIncorrectData = { description: 'test' };
  const validation = new Validation<SchemaWithTitle>({
    type: 'object',
    required: ['title'],
    properties: {
      title: {
        type: 'string',
      },
    },
  });

  expect(() => {
    validation.validate(randomIncorrectData);
  }).toThrow();
});
