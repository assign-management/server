import { UserInputError } from 'apollo-server-core';
import { GraphQLScalarType, GraphQLSchema, Kind } from 'graphql';
import GraphQLJSON from 'graphql-type-json';
import { Resolvers } from '../types/generated/graphql';

/**
 * @link https://www.apollographql.com/docs/apollo-server/schema/custom-scalars
 */
const dateScalar = new GraphQLScalarType<Date, string>({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (typeof value === 'string' || typeof value === 'number' || value instanceof Date)
      return new Date(value).toISOString();
    throw new UserInputError('Provided value is not a Date');
  },
  parseValue(value) {
    if (typeof value === 'string' || typeof value === 'number') return new Date(value);
    throw new UserInputError('Provided value is not a Date');
  },
  /**
   *
   * @param ast abstract syntax tree
   */
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    if (ast.kind === Kind.INT) {
      return new Date(Number.parseInt(ast.value, 10));
    }

    throw new UserInputError('Provided value is not a Date');
  },
});

export const commonResolvers: Resolvers = {
  Date: dateScalar,
  JSON: GraphQLJSON,
};
