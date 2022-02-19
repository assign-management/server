import { default as request } from 'supertest';
import { app } from '../../app';
import { projectRepository } from '../../repositories';
import { print } from 'graphql';
import { gql } from 'apollo-server-core';

describe('projects', () => {
  test('passes when given an empty string', () => {
    expect('').toBeEmpty();
    expect('hello').not.toBeEmpty();
  });
  it('create a project', async () => {
    const { httpServer } = await app();
    const startingCount = await projectRepository.count();
    const { body } = await request(httpServer)
      .post('/graphql')
      .send({
        variables: {
          data: {
            title: 'test2',
            accessibility: 'PRIVATE',
          },
        },
        query: print(gql`
          mutation ($data: CreateProjectArgs!) {
            createProject(data: $data) {
              code
              success
              message
              project {
                id
                title
                accessibility
                createdAt
                updatedAt
              }
            }
          }
        `),
      });

    const finishingCount = await projectRepository.count();
    console.log('finishingCount', finishingCount);

    expect(finishingCount - startingCount).toEqual(1);
  });
});
