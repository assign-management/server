import request from 'supertest';
import { ASTNode, print } from 'graphql';
import { buildApp } from './build-app';

interface GraphqlArguments {
  query: ASTNode;
  variables?: Object;
  operationName?: string;
}

export const graphqlRequest = async ({ query, ...rest }: GraphqlArguments) => {
  const app = await buildApp();
  return request(app)
    .post('/graphql')
    .send({ query: print(query), ...rest });
};
