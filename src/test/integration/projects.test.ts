import { default as request } from 'supertest';
import { app } from '../../app';
import projectRepo from '../../repos/project-repo';
import gql from 'graphql-tag';

// import projectRepo from '../../repos/project-repo';
// import { Context } from '../context';
// import { createTestClient } from 'apollo-server-integration-testing';

describe('projects', () => {
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
    const startingCount = await projectRepo.count();
    console.log('startingCount', startingCount);

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

    console.log('body', JSON.stringify(body, null, 2));

    const finishingCount = await projectRepo.count();
    console.log('finishingCount', finishingCount);

    expect(finishingCount - startingCount).toEqual(1);
  });
});

// describe('users', () => {
//   let context: Context;
//   beforeAll(async () => {
//     context = await Context.build();
//   });

//   beforeEach(() => context.reset());

//   afterAll(() => context.close());

//   it('create a user', async () => {
//     const startingCount = await projectRepo.create({ title: 'string' });
//     await request(await app())
//       .post('/graphql')
//       .send({ username: 'testuser', bio: 'test bio' })
//       .expect(200);

//     const finishingCount = await UserRepo.count();
//     expect(finishingCount - startingCount).toEqual(1);
//   });
// });
