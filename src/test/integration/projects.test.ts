import { default as request } from 'supertest';
import { app } from '../../app';
import { ProjectRepository } from '../../repositories';
import gql from 'graphql-tag';

describe('projects', () => {
  test('passes when given an empty string', () => {
    expect('').toBeEmpty();
    expect('hello').not.toBeEmpty();
  });
  it('create a project', async () => {
    const createProjectMutation = gql`
      mutation Mutation($args: CreateProjectArgs!) {
        createProject(args: $args) {
          project {
            title
          }
        }
      }
    `;

    const { httpServer } = await app();
    const startingCount = await ProjectRepository.count();
    const { body } = await request(httpServer)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        variables: { args: { title: 'test' } },
        operationName: 'Mutation',
        query: `mutation Mutation($args: CreateProjectArgs!) {
            createProject(args: $args) {
              project {
                title
                id
                accessibility
            }
        }
      }
        `,
      });

    const finishingCount = await ProjectRepository.count();
    expect(finishingCount - startingCount).toEqual(1);
  });
});
