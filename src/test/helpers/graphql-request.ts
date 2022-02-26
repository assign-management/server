import request from 'supertest';
import { ASTNode, print } from 'graphql';

interface GraphqlArguments {
  query: ASTNode;
  variables?: Object;
  operationName?: string;
}

/**
 *
 * @link https://www.apollographql.com/docs/apollo-server/requests/#post-requests
 * @param param
 * @returns
 */
export const graphqlRequest = async ({ query, ...rest }: GraphqlArguments) =>
  request(context.app)
    .post('/graphql')
    .send({ query: print(query), ...rest });
